import { SET_WAITING, CLEAR_WAITING } from '../actions/waiting'
import { SET_USER } from '../actions/user'
import { SHOW_ERROR } from '../actions/error'
import waitingReducer from './waiting'

describe('waiting reducer', () => {
  it('returns true on "SET_WAITING"', () => {
    const action = {
      type: SET_WAITING
    }
    const newState = waitingReducer(false, action)
    expect(newState).toBeTruthy()
  })

  it('returns false on "SET_USER"', () => {
    const action = {
      type: SET_USER
    }
    const newState = waitingReducer(true, action)
    expect(newState).toBeFalsy()
  })

  it('returns false on "CLEAR_WAITING"', () => {
    const action = {
      type: CLEAR_WAITING
    }
    const newState = waitingReducer(true, action)
    expect(newState).toBeFalsy()
  })

  it('returns false on "SHOW_ERROR"', () => {
    const action = {
      type: SHOW_ERROR
    }
    const newState = waitingReducer(true, action)
    expect(newState).toBeFalsy()
  })

  it('returns old state on unknown action type', () => {
    const action = {
      type: 'RANDOM_OTHER_ACTION'
    }
    const newState = waitingReducer(false, action)
    expect(newState).toBeFalsy()
  })
})
