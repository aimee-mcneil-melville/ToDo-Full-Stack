import { SET_WAITING } from '../actions/waiting'
import { dispatch, getState } from '../store'
import { toggleVolunteerStatus } from './eventItemHelper'

jest.mock('../store')
jest.mock('../pages/gardenHelper')

afterEach(() => {
  return dispatch.mockClear()
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
    getState.mockImplementation(() => ({ user: { id: 4 } }))
    const eventId = 3
    const isVolunteer = true

    function consume (url, method, userData) {
      expect(method).toBe('delete')
      expect(userData.userId).toBe(4)
      return Promise.resolve()
    }
    return toggleVolunteerStatus(eventId, isVolunteer, consume)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
        return null
      })
  })
})
