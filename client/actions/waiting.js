export const SET_WAITING = 'SET_WAITING'
export const CLEAR_WAITING = 'CLEAR_WAITING'

export function setWaiting () {
  return {
    type: SET_WAITING
  }
}

export function clearWaiting () {
  return {
    type: CLEAR_WAITING
  }
}
