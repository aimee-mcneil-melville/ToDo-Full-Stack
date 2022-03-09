import { getUsers } from '../apis/users'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const CLEAR_USER = 'CLEAR_USER'
export const CLEAR_USERS = 'CLEAR_USERS'

export function setUser (user) {
  return {
    type: SET_USER,
    user
  }
}

export function setUsers (users) {
  return {
    type: SET_USERS,
    users
  }
}

export function clearUser () {
  return {
    type: CLEAR_USER
  }
}

export function clearUsers () {
  return {
    type: CLEAR_USERS
  }
}

export function fetchUsers () {
  return dispatch => {
    return getUsers()
      .then(users => {
        dispatch(setUsers(users))
        return null
      })
  }
}
