import {
  setUser,
  clearUser,
  SET_USER,
  CLEAR_USER
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
