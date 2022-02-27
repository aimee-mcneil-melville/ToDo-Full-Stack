import { SET_USER, CLEAR_USER } from '../actions/user'
import userReducer from './user'

jest.mock('../auth-utils')

describe('user reducer', () => {
  it('returns new user object on "SET_USER"', () => {
    const user = {
      id: 4,
      firstName: 'test',
      isAdmin: false,
      gardenId: 3,
    }

    const oldState = {
      firstName: '',
      isAdmin: false,
      gardenId: null,
      id: null,
    }

    const action = {
      type: SET_USER,
      user,
    }
    const newState = userReducer(oldState, action)
    expect(newState.firstName).toBe('test')
    expect(newState).not.toBe(oldState)
  })

  it('returns default empty user object on "CLEAR_USER"', () => {
    const oldState = {
      firstName: 'test',
      isAdmin: false,
      gardenId: 2,
      id: 5,
    }
    const action = {
      type: CLEAR_USER,
    }
    const newState = userReducer(oldState, action)
    expect(newState.gardenId).toBeNull()
    expect(newState).not.toBe(oldState)
  })

  it('returns old state on unknown action type', () => {
    const oldState = {
      firstName: 'test',
      isAdmin: false,
      gardenId: 2,
      id: 5,
    }
    const action = {
      type: 'RANDOM_OTHER_ACTION',
    }
    const newState = userReducer(oldState, action)
    expect(newState).toBe(oldState)
  })
})
