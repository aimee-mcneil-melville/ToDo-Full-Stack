import {
  showError,
  hideError,
  SHOW_ERROR,
  HIDE_ERROR
} from './error'

test('showError returns the correct action', () => {
  const action = showError('test error')

  expect(action.type).toBe(SHOW_ERROR)
  expect(action.errorMessage).toMatch('test error')
})

test('hideError returns the correct action', () => {
  const action = hideError()
  expect(action.type).toBe(HIDE_ERROR)
})
