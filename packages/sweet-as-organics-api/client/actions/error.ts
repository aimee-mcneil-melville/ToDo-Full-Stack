export const SHOW_ERROR = 'SHOW_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'

export type Action =
  | { type: typeof SHOW_ERROR; payload: string }
  | { type: typeof HIDE_ERROR; payload: unknown }

export function showError(errorMessage: string): Action {
  return {
    type: SHOW_ERROR,
    payload: errorMessage,
  }
}

export function hideError(): Action {
  return {
    type: HIDE_ERROR,
    payload: undefined,
  }
}
