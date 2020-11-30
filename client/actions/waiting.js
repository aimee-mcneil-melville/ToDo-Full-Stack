export const SET_WAITING = 'SET_WAITING'
export const CLEAR_WAITING = 'CLEAR_WAITING'

export const setWaiting = () => {
  return {
    type: SET_WAITING
  }
}

export const clearWaiting = () => {
  return {
    type: CLEAR_WAITING
  }
}
