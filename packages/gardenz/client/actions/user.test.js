import {
  setUser,
  clearUser,
  SET_USER,
  CLEAR_USER
} from './user'

describe('setUser', () => {
  it('returns the correct action', () => {
    const action = setUser()
    expect(action.type).toBe(SET_USER)
  })
})

describe('clearUser', () => {
  it('returns the correct action', () => {
    const action = clearUser()
    expect(action.type).toBe(CLEAR_USER)
  })
})
