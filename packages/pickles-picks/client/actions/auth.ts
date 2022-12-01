import { getUserTokenInfo, isAuthenticated, removeUser } from '../utils/auth'
import { login, register } from '../apis/auth'
import type { AppThunkAction } from '../store'
import { JwtResponse, Cred, RegisterUser } from 'authenticare/client'


export type Action =
  | { type: 'AUTH_REQUEST' }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGIN'; payload: JwtResponse }
  | { type: 'LOGOUT' }

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
interface ConfirmSuccess {
  (): void
  (): void
}

export function authRequest(): Action {
  return {
    type: AUTH_REQUEST,
  }
}

export function authError(message: string): Action {
  return {
    type: AUTH_FAILURE,
    payload: message,
  }
}

export function receiveUser(user: JwtResponse): Action {
  return {
    type: LOGIN,
    payload: user,
  }
}

export function receiveLogout(): Action {
  return {
    type: LOGOUT,
  }
}

export function registerUserRequest(
  creds: RegisterUser,
  confirmSuccess: ConfirmSuccess
): AppThunkAction {
  return (dispatch) => {
    dispatch(authRequest())
    register(creds)
      .then((userInfo: JwtResponse ) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err: Error) => dispatch(authError(err.message)))
  }
}

export function loginUser(
  creds: Cred,
  confirmSuccess: ConfirmSuccess
): AppThunkAction {
  return (dispatch) => {
    dispatch(authRequest())
    return login(creds)
      .then((userInfo: JwtResponse) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err: Error) => {
        dispatch(authError(err.message))
      })
  }
}

export function logoutUser(confirmSuccess: ConfirmSuccess): AppThunkAction {
  return (dispatch) => {
    removeUser()
    dispatch(receiveLogout())
    confirmSuccess()
  }
}

export function checkAuth(confirmSuccess: ConfirmSuccess): AppThunkAction {
  return (dispatch) => {
    if (isAuthenticated()) {
      dispatch(receiveUser(getUserTokenInfo()))
      confirmSuccess()
    }
  }
}
