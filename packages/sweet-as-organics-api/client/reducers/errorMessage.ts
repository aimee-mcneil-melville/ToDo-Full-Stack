import { SHOW_ERROR, HIDE_ERROR } from '../actions/error'
import type { Action } from '../actions'

function errorMessage(state = '', action: Action) {
  switch (action.type) {
    case SHOW_ERROR:
      return action.payload

    case HIDE_ERROR:
      return ''

    default:
      return state
  }
}

export default errorMessage
