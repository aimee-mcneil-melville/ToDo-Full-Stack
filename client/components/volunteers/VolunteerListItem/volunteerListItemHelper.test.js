import { toggleAttendance } from './volunteerListItemHelper'

import { dispatch, getState } from '../../../store'
import { SET_WAITING, CLEAR_WAITING } from '../../../actions/waiting'
import { SHOW_ERROR } from '../../../actions/error'

jest.mock('../../../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('toggleAttendance', () => {
  it('dispatches correctly and returns true on success', () => {
    getState.mockImplementation(() => ({
      user: { id: 4, token: 'dummytoken' },
    }))
    const volunteerData = {
      eventId: 1,
      userId: 3,
      hasAttended: true,
    }
    function consume(path, token, method, data) {
      expect(method).toBe('patch')
      expect(data.hasAttended).toBeTruthy()
      return Promise.resolve()
    }
    return toggleAttendance(volunteerData, consume).then((response) => {
      expect(response).toBeTruthy()
      expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
      expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_WAITING })
      return null
    })
  })

  it('dispatches correctly and returns false on API consumption failure', () => {
    getState.mockImplementation(() => ({
      user: { id: 4, token: 'dummytoken' },
    }))
    const volunteerData = {
      eventId: 1,
      userId: 3,
      hasAttended: true,
    }
    function consume() {
      return Promise.reject(new Error('mock consume error'))
    }
    return toggleAttendance(volunteerData, consume).then((response) => {
      expect(response).toBeFalsy()
      expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
      expect(dispatch).toHaveBeenCalledWith({
        type: SHOW_ERROR,
        errorMessage: 'mock consume error',
      })
      return null
    })
  })
})
