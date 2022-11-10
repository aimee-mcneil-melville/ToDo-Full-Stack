import { getUserTokenInfo, isAuthenticated, removeUser } from '../utils/auth'
import { login, register } from '../apis/auth'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

import { User } from '../../common/User'

interface ConfirmSuccess {
  (): void
  (): void
}

export function authRequest() {
  return {
    type: AUTH_REQUEST,
  }
}

export function authError(message: string) {
  return {
    type: AUTH_FAILURE,
    payload: message,
  }
}

export function receiveUser(user: string) {
  return {
    type: LOGIN,
    payload: user,
  }
}

export function receiveLogout() {
  return {
    type: LOGOUT,
  }
}

export function registerUserRequest(
  creds: User,
  confirmSuccess: ConfirmSuccess
) {
  return (dispatch) => {
    dispatch(authRequest())
    register(creds)
      .then((userInfo: string) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err: Error) => dispatch(authError(err.message)))
  }
}

export function loginUser(creds: User, confirmSuccess: ConfirmSuccess) {
  return (dispatch) => {
    dispatch(authRequest())
    return login(creds)
      .then((userInfo: string) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err: Error) => {
        dispatch(authError(err.message))
      })
  }
}

export function logoutUser(confirmSuccess: ConfirmSuccess) {
  return (dispatch) => {
    removeUser()
    dispatch(receiveLogout())
    confirmSuccess()
  }
}

export function checkAuth(confirmSuccess: ConfirmSuccess) {
  return (dispatch) => {
    if (isAuthenticated()) {
      dispatch(receiveUser(getUserTokenInfo()))
      confirmSuccess()
    }
  }
}
