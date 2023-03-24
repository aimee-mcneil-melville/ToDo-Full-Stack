import { SHOW_ERROR, HIDE_ERROR } from '../actions/error'
import type { AppAction } from '../actions'

function errorMessage(state = '', action: AppAction) {
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
