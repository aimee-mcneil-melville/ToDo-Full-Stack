import { getEvent, toggleVolunteerStatus } from './eventHelper'
import { SET_WAITING, CLEAR_WAITING } from '../actions/waiting'
import { dispatch, getState } from '../store'

jest.mock('../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('getEvent', () => {
  describe('-> GET /events/:id api call success', () => {
    it('dispatches with the correct event action', () => {
      function consume (path) {
        expect(path).toMatch('2')
        return Promise.resolve({
          body: {
            gardenName: 'test name',
            gardenAddress: 'test address',
            title: 'test event',
            date: '2021-04-30',
            volunteersNeeded: 3,
            description: 'wow great description',
            fake: 'asdf'
          }
        })
      }

      return getEvent(2, consume)
        .then((event) => {
          expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
          expect(dispatch).toHaveBeenCalledWith({
            type: CLEAR_WAITING
          })
          expect(event.title).toBe('test event')
          expect(event).not.toHaveProperty('fake')
          return null
        })
    })
  })

  describe('-> GET /event/:id api call rejection', () => {
    it('dispatches error correctly', () => {
      function consume () {
        return Promise.reject(new Error('mock error'))
      }
      return getEvent(null, consume)
        .then(() => {
          expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
          return null
        })
    })
  })
})

describe('toggleVolunteerStatus', () => {
  it('dispatches post', () => {
    getState.mockImplementation(() => ({ user: { id: 2 } }))
    const eventId = 1
    const isVolunteer = false

    function consume (url, method, userData) {
      expect(method).toBe('post')
      expect(userData.userId).toBe(2)
      return Promise.resolve()
    }
    return toggleVolunteerStatus(eventId, isVolunteer, consume)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        return null
      })
  })

  it('dispatches delete', () => {
    expect.assertions(2)
    getState.mockImplementation(() => ({ user: { id: 4 } }))
    const eventId = 3
    const isVolunteer = true

    function consume (url, method, userData) {
      expect(method).toBe('delete')
      expect(userData.userId).toBe(4)
      return Promise.resolve()
    }

    return toggleVolunteerStatus(eventId, isVolunteer, consume)
  })

  it('dispatches correct actions and returns true when api call successful', () => {
    getState.mockImplementation(() => ({ user: { id: 4 } }))

    function consume () {
      return Promise.resolve()
    }
    return toggleVolunteerStatus(null, null, consume)
      .then((wasSuccessful) => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
        expect(wasSuccessful).toBeTruthy()
        return null
      })
  })

  it('dispatches error correctly and returns false when api call unsuccessful', () => {
    getState.mockImplementation(() => ({ user: { id: 1 } }))
    function consume () {
      return Promise.reject(new Error('mock error'))
    }
    return toggleVolunteerStatus(null, null, consume)
      .then((wasSuccessful) => {
        expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
        expect(wasSuccessful).toBeFalsy()
        return null
      })
  })

  it('shows error if no user id (user not logged in)', () => {
    getState.mockImplementation(() => ({ user: { id: null } }))

    return toggleVolunteerStatus()
      .then((wasSuccessful) => {
        expect(dispatch.mock.calls[0][0].errorMessage).toMatch('Please register or sign in to volunteer.')
        expect(wasSuccessful).toBeFalsy()
        return null
      })
  })
})
