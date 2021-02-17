import {
  showError,
  hideError,
  SHOW_ERROR,
  HIDE_ERROR
} from './error'

describe('showError', () => {
  it('returns the correct action', () => {
    const action = showError('mock error')
    expect(action.type).toBe(SHOW_ERROR)
    expect(action.errorMessage).toBe('mock error')
  })
})

describe('hideError', () => {
  it('returns the correct action', () => {
    const action = hideError()
    expect(action.type).toBe(HIDE_ERROR)
  })
})
