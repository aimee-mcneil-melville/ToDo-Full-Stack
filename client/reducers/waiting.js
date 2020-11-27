import { SET_WAITING, CLEAR_WAITING } from '../actions/waiting'
import { SET_USER } from '../actions/user'

const waiting = (state = false, action) => {
  switch (action.type) {
    case SET_WAITING:
      return true

    case SET_USER:
    case CLEAR_WAITING:
      return false

    default:
      return state
  }
}

export default waiting
