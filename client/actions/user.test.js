import { setUser, clearUser } from './user'

test('setUser returns the correct action', () => {
  const user = {
    username: 'testuser',
    gardenId: 1,
    isAdmin: false
  }

  const action = setUser(user)

  expect(action.type).toBe('SET_USER')
  expect(action.user.username).toBe('testuser')
})

test('clearUser returns the correct action', () => {
  const action = clearUser()
  expect(action.type).toBe('CLEAR_USER')
})
