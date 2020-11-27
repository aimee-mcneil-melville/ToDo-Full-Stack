import { SET_WAITING } from '../actions/waiting'

const waiting = (state = false, action) => {
  switch (action.type) {
    case SET_WAITING:
      return true

    default:
      return state
  }
}

export default waiting
