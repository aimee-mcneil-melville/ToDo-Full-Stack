import { setUser, clearUser, setUserLocation, SET_USER, CLEAR_USER, USER_LOCATION } from './user'

test('setUser returns the correct action', () => {
  const user = {
    username: 'testuser',
    gardenId: 1,
    isAdmin: false
  }

  const action = setUser(user)

  expect(action.type).toBe(SET_USER)
  expect(action.user.username).toBe('testuser')
})

test('clearUser returns the correct action', () => {
  const action = clearUser()
  expect(action.type).toBe(CLEAR_USER)
})

test('setUserLocation returns the correct action', () => {
  const action = setUserLocation()
  expect(action.type).toBe(USER_LOCATION)
})
