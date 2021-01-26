import { isAuthenticated, getDecodedToken } from '../auth'
import { SET_USER, CLEAR_USER } from '../actions/user'
import userReducer, { getUser } from './user'

jest.mock('../auth')

describe('user reducer', () => {
  it('returns new user object on "SET_USER"', () => {
    const oldState = {
      username: '',
      isAdmin: false,
      gardenId: null,
      latitude: null,
      longitude: null
    }

    const action = {
      type: SET_USER,
      user: {
        username: 'test user',
        isAdmin: false,
        gardenId: 2,
        latitude: null,
        longitude: null
      }
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
      latitude: null,
      longitude: null
    }
    const action = {
      type: CLEAR_USER
    }
    const newState = userReducer(oldState, action)
    expect(newState.gardenId).toBeNull()
    expect(newState).not.toBe(oldState)
  })

  it('returns user location data attached to object on "USER_LOCATION"', () => {
    const oldState = {
      username: '',
      isAdmin: false,
      gardenId: null,
      latitude: null,
      longitude: null
    }
    const latitude = -36.8721312
    const longitude = 174.7837615
    const location = { latitude, longitude }
    const action = {
      type: 'USER_LOCATION',
      location
    }
    const newState = userReducer(oldState, action)
    expect(newState).not.toBe(oldState)
  })

  it('returns old state on unknown action type', () => {
    const oldState = {
      username: 'test user',
      isAdmin: false,
      gardenId: 2,
      latitude: null,
      longitude: null
    }
    const action = {
      type: 'RANDOM_OTHER_ACTION'
    }
    const newState = userReducer(oldState, action)
    expect(newState).toBe(oldState)
  })
})

describe('getUser', () => {
  it('returns user data from token if authenticated', () => {
    isAuthenticated.mockImplementation(() => true)
    getDecodedToken.mockImplementation(() => {
      return {
        username: 'test username',
        isAdmin: false,
        gardenId: 2
      }
    })
    const user = getUser()
    expect(user.username).toBe('test username')
  })

  it('returns empty user object if user not authenticated', () => {
    isAuthenticated.mockImplementation(() => false)
    getDecodedToken.mockImplementation(() => ({}))
    const user = getUser()
    expect(user.username).toBe('')
  })
})
