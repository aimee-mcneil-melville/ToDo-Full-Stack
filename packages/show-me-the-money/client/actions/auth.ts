import { JwtResponse, Cred, Register } from 'authenticare/client'

import { getUserTokenInfo, isAuthenticated, removeUser } from '../utils/auth'
import { login, register } from '../apis/auth'
import type { ThunkAction } from '../store'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export type Action = 
  { type: 'AUTH_REQUEST'; payload: null } |
  { type: 'AUTH_FAILURE'; payload: string} |
  { type: 'LOGIN'; payload: JwtResponse } |
  { type: 'LOGOUT'; payload: null }

export function authRequest(): Action {
  return {
    type: AUTH_REQUEST,
    payload: null
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
    payload: null
  }
}

interface confirmSuccess {
  (): void
  (): void
}

export function registerUserRequest(creds: Register, confirmSuccess: confirmSuccess): ThunkAction {
  return (dispatch) => {
    dispatch(authRequest())
    register(creds)
      .then((userInfo) => {
        dispatch(receiveUser(userInfo))
        confirmSuccess()
      })
      .catch((err) => dispatch(authError(err)))
  }
}

export function loginUser(creds: Cred, confirmSuccess: confirmSuccess): ThunkAction {
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

export function logoutUser(confirmSuccess: confirmSuccess): ThunkAction {
  return (dispatch) => {
    removeUser()
    dispatch(receiveLogout())
    confirmSuccess()
  }
}

export function checkAuth(confirmSuccess: confirmSuccess): ThunkAction {
  return (dispatch) => {
    if (isAuthenticated()) {
      dispatch(receiveUser(getUserTokenInfo()))
      confirmSuccess()
    }
  }
}
