import { showError, SHOW_ERROR } from './error'

test('showError returns the correct action', () => {
  const action = showError('test error')

  expect(action.type).toBe(SHOW_ERROR)
  expect(action.errorMessage).toMatch('test error')
})
