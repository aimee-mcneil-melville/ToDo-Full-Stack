export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'

export function setUser () {
  return {
    type: SET_USER
  }
}

export function clearUser () {
  return {
    type: CLEAR_USER
  }
}
