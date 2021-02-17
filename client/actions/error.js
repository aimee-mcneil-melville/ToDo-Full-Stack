export const SHOW_ERROR = 'SHOW_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'

export function showError (errorMessage) {
  return {
    type: SHOW_ERROR,
    errorMessage
  }
}

export function hideError () {
  return {
    type: HIDE_ERROR
  }
}
