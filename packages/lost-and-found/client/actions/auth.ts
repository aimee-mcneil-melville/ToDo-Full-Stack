import { getUserTokenInfo, isAuthenticated, removeUser } from '../utils/auth'
import { login, register } from '../apis/auth'
import { User } from '../../common/User'
import type { AppDispatch } from '../store'
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export type Action =
  | { type: 'AUTH_REQUEST' }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }

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

export function receiveUser(user: User): Action {
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

interface ConfirmSuccess {
  (): void
  (): void
}

export function registerUserRequest(
  creds: User,
  confirmSuccess: ConfirmSuccess
) {
  return (dispatch: AppDispatch) => {
    dispatch(authRequest())
    register(creds)
      .then((userInfo) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err) => dispatch(authError(err)))
  }
}

export function loginUser(creds: User, confirmSuccess: ConfirmSuccess) {
  return (dispatch: AppDispatch) => {
    dispatch(authRequest())
    return login(creds)
      .then((userInfo) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err: Error) => {
        dispatch(authError(err.message))
      })
  }
}

export function logoutUser(confirmSuccess: ConfirmSuccess) {
  return (dispatch: AppDispatch) => {
    removeUser()
    dispatch(receiveLogout())
    confirmSuccess()
  }
}

export function checkAuth(confirmSuccess: ConfirmSuccess) {
  return (dispatch: AppDispatch) => {
    if (isAuthenticated()) {
      dispatch(receiveUser(getUserTokenInfo()))
      confirmSuccess()
    }
  }
}
