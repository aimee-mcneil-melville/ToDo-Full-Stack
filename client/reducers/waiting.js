import { SET_WAITING, CLEAR_WAITING } from '../actions/waiting'
import { SHOW_ERROR } from '../actions/error'
import { SET_USER } from '../actions/user'

export default function waiting (state = false, action) {
  switch (action.type) {
    case SET_WAITING:
      return true

    case SET_USER:
    case SHOW_ERROR:
    case CLEAR_WAITING:
      return false

    default:
      return state
  }
}
