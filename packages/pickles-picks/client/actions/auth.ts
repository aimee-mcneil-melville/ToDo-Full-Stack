import { getUserTokenInfo, isAuthenticated, removeUser } from '../utils/auth'
import { login, register } from '../apis/auth'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

interface User {
  username: string
  password: string
  email_address: string
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

export function receiveUser(user:User) {
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

export function registerUserRequest(creds, confirmSuccess): any {
  return (dispatch) => {
    dispatch(authRequest())
    register(creds)
      .then((userInfo:User) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err: Error) => dispatch(authError(err.message)))
  }
}

export function loginUser(creds, confirmSuccess): any {
  return (dispatch) => {
    dispatch(authRequest())
    return login(creds)
      .then((userInfo) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err) => {
        dispatch(authError(err))
      })
  }
}

export function logoutUser(confirmSuccess):any {
  return (dispatch) => {
    removeUser()
    dispatch(receiveLogout())
    confirmSuccess()
  }
}

export function checkAuth(confirmSuccess):any {
  return (dispatch) => {
    if (isAuthenticated()) {
      dispatch(receiveUser(getUserTokenInfo()))
      confirmSuccess()
    }
  }
}
