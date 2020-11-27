import { SET_USER, CLEAR_USER } from '../actions/user'
import userReducer from './user'

test('returns new user object on "SET_USER"', () => {
  const oldState = {
    username: '',
    isAdmin: false,
    gardenId: null
  }

  const action = {
    type: SET_USER,
    user: {
      username: 'test user',
      isAdmin: false,
      gardenId: 2
    }
  }
  const newState = userReducer(oldState, action)
  expect(newState.username).toBe('test user')
  expect(newState).not.toBe(oldState)
})

test('returns default empty user object on "CLEAR_USER"', () => {
  const oldState = {
    username: 'test user',
    isAdmin: false,
    gardenId: 2
  }
  const action = {
    type: CLEAR_USER
  }
  const newState = userReducer(oldState, action)
  expect(newState.gardenId).toBeNull()
  expect(newState).not.toBe(oldState)
})

test('returns old state on unknown action type', () => {
  const oldState = {
    username: 'test user',
    isAdmin: false,
    gardenId: 2
  }
  const action = {
    type: 'RANDOM_OTHER_ACTION'
  }
  const newState = userReducer(oldState, action)
  expect(newState).toBe(oldState)
})
