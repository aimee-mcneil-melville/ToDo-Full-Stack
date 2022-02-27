import { SET_WAITING, CLEAR_WAITING } from '../actions/waiting'
import { SHOW_ERROR } from '../actions/error'
import { SET_GARDEN, UPDATE_EVENT_VOLS } from '../actions/garden'

export default function waiting(state = false, action) {
  switch (action.type) {
    case SET_WAITING:
      return true

    case SET_GARDEN:
    case SHOW_ERROR:
    case CLEAR_WAITING:
    case UPDATE_EVENT_VOLS:
      return false

    default:
      return state
  }
}
