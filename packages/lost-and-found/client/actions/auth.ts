import { getUserTokenInfo, isAuthenticated, removeUser } from '../utils/auth'
import { login, register } from '../apis/auth'
import { User } from '../../common/User'
import { Dispatch } from 'redux'
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

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

export function receiveUser(user: User) {
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
interface ConfirmSuccess {
  (): void
  (): void
}

export function registerUserRequest(
  creds: User,
  confirmSuccess: ConfirmSuccess
) {
  return (dispatch: Dispatch) => {
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
  return (dispatch: Dispatch) => {
    dispatch(authRequest())
    return login(creds)
      .then((userInfo: User) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err: Error) => {
        dispatch(authError(err.message))
      })
  }
}

export function logoutUser(confirmSuccess: ConfirmSuccess) {
  return (dispatch: Dispatch) => {
    removeUser()
    dispatch(receiveLogout())
    confirmSuccess()
  }
}

export function checkAuth(confirmSuccess: ConfirmSuccess) {
  return (dispatch: Dispatch) => {
    if (isAuthenticated()) {
      dispatch(receiveUser(getUserTokenInfo()))
      confirmSuccess()
    }
  }
}
