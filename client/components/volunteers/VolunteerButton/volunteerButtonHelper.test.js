import { toggleVolunteerStatus } from './volunteerButtonHelper'
import { SET_WAITING } from '../../../actions/waiting'
import { UPDATE_EVENT_VOLS } from '../../../actions/garden'
import { dispatch, getState } from '../../../store'

jest.mock('../../../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('toggleVolunteerStatus', () => {
  it('dispatches error if user not logged in', () => {
    getState.mockImplementation(() => ({
      user: { id: null, token: 'dummytoken' },
    }))

    toggleVolunteerStatus()
    expect(dispatch.mock.calls[0][0].errorMessage).toMatch(
      'Please register or sign in to volunteer.'
    )
  })

  it('makes post request when wanting to volunteer', () => {
    expect.assertions(2)
    getState.mockImplementation(() => ({ user: { id: 2 } }))
    const eventId = 1
    const willVolunteer = true

    function consume(url, token, method, userData) {
      expect(method).toBe('post')
      expect(userData.userId).toBe(2)
      return Promise.resolve()
    }

    return toggleVolunteerStatus(eventId, willVolunteer, null, consume)
  })

  it('makes delete request when wanting to unvolunteer', () => {
    expect.assertions(2)
    getState.mockImplementation(() => ({
      user: { id: 4, token: 'dummytoken' },
    }))
    const eventId = 3
    const willVolunteer = false

    function consume(url, token, method, userData) {
      expect(method).toBe('delete')
      expect(userData.userId).toBe(4)
      return Promise.resolve()
    }

    return toggleVolunteerStatus(eventId, willVolunteer, null, consume)
  })

  it('dispatches correct actions and calls setVolunteering when api call successful', () => {
    getState.mockImplementation(() => ({
      user: { id: 4, token: 'dummytoken' },
    }))
    const willVolunteer = true
    const setVolunteering = jest.fn()
    const eventId = 1

    function consume() {
      return Promise.resolve()
    }

    return toggleVolunteerStatus(
      eventId,
      willVolunteer,
      setVolunteering,
      consume
    ).then(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
      expect(dispatch).toHaveBeenCalledWith({
        type: UPDATE_EVENT_VOLS,
        eventId: eventId,
      })
      expect(setVolunteering).toHaveBeenCalledWith(true)
      return null
    })
  })

  it('dispatches error correctly and returns false when api call unsuccessful', () => {
    getState.mockImplementation(() => ({
      user: { id: 1, token: 'dummytoken' },
    }))
    const setVolunteering = jest.fn()

    function consume() {
      return Promise.reject(new Error('mock error'))
    }

    return toggleVolunteerStatus(null, null, setVolunteering, consume).then(
      () => {
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        expect(setVolunteering).not.toHaveBeenCalled()
        return null
      }
    )
  })
})
