import { getUsers } from '../apis/users.ts'
import { User, UserData } from '../../models/user.ts'
import { ThunkAction } from '../store.ts'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const CLEAR_USERS = 'CLEAR_USERS'
export const CLEAR_USER = 'CLEAR_USER'

export type UserAction =
  | { type: 'SET_USER'; payload: UserData }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'CLEAR_USERS'; payload: null }
  | { type: 'CLEAR_USER'; payload: null }

export function setUser(user: UserData): UserAction {
  return {
    type: 'SET_USER',
    payload: user,
  }
}

export function setUsers(users: User[]): UserAction {
  return {
    type: 'SET_USERS',
    payload: users,
  }
}

export function clearUser(): UserAction {
  return {
    type: 'CLEAR_USER',
    payload: null,
  }
}

export function clearUsers(): UserAction {
  return {
    type: 'CLEAR_USERS',
    payload: null,
  }
}

export function fetchUsers(): ThunkAction {
  return (dispatch) => {
    return getUsers().then((users) => {
      dispatch(setUsers(users))
    })
  }
}
