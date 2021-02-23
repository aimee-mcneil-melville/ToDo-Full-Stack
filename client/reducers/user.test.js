import { getUser } from '../auth-utils'
import { SET_USER, CLEAR_USER } from '../actions/user'
import userReducer from './user'

jest.mock('../auth-utils')

describe('user reducer', () => {
  it('returns new user object on "SET_USER"', () => {
    getUser.mockImplementation(() => ({
      id: 4,
      username: 'test user',
      isAdmin: false,
      gardenId: 3
    }))
    const oldState = {
      username: '',
      isAdmin: false,
      gardenId: null,
      id: null
    }

    const action = {
      type: SET_USER
    }
    const newState = userReducer(oldState, action)
    expect(newState.username).toBe('test user')
    expect(newState).not.toBe(oldState)
  })

  it('returns default empty user object on "CLEAR_USER"', () => {
    const oldState = {
      username: 'test user',
      isAdmin: false,
      gardenId: 2,
      id: 5
    }
    const action = {
      type: CLEAR_USER
    }
    const newState = userReducer(oldState, action)
    expect(newState.gardenId).toBeNull()
    expect(newState).not.toBe(oldState)
  })

  it('returns old state on unknown action type', () => {
    const oldState = {
      username: 'test user',
      isAdmin: false,
      gardenId: 2,
      id: 5
    }
    const action = {
      type: 'RANDOM_OTHER_ACTION'
    }
    const newState = userReducer(oldState, action)
    expect(newState).toBe(oldState)
  })
})
