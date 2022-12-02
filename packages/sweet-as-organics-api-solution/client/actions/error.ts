import { AppAction } from '.'

export const SHOW_ERROR = 'SHOW_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'

export type ErrorAction =
  | { type: typeof SHOW_ERROR; payload: { errorMessage: string } }
  | { type: typeof HIDE_ERROR }

export const isErrorAction = (action: AppAction) => {
  return action.type === SHOW_ERROR || action.type === HIDE_ERROR
}

export function showError(errorMessage: string): ErrorAction {
  return {
    type: SHOW_ERROR,
    payload: { errorMessage },
  }
}

export function hideError(): ErrorAction {
  return {
    type: HIDE_ERROR,
  }
}
