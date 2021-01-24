import {
  setUser,
  clearUser,
  setUserLocation,
  SET_USER,
  CLEAR_USER,
  USER_LOCATION
} from './user'

describe('setUser', () => {
  it('returns the correct action', () => {
    const user = {
      username: 'testuser',
      gardenId: 1,
      isAdmin: false
    }
    const action = setUser(user)
    expect(action.type).toBe(SET_USER)
    expect(action.user.username).toBe('testuser')
  })
})

describe('clearUser', () => {
  it('returns the correct action', () => {
    const action = clearUser()
    expect(action.type).toBe(CLEAR_USER)
  })
})

describe('setUserLocation', () => {
  it('returns the correct action', () => {
    const location = {
      latitude: 123.45,
      longitude: -123.45
    }
    const action = setUserLocation(location)
    expect(action.type).toBe(USER_LOCATION)
    expect(action.location.longitude).toBe(-123.45)
  })
})
