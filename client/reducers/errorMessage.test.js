import errorMessage from './errorMessage'
import { SHOW_ERROR } from '../actions/error'

test('returns error message on SHOW_ERROR', () => {
  const action = {
    type: SHOW_ERROR,
    errorMessage: 'mock error'
  }
  const newState = errorMessage('', action)
  expect(newState).toBe('mock error')
})

test('returns old state if action does not match', () => {
  const action = {
    type: 'RANDOM_TEST_ACTION_TYPE'
  }
  const newState = errorMessage('mock old error state', action)
  expect(newState).toBe('mock old error state')
})
