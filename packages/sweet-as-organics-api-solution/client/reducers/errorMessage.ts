import { AppAction } from '../actions'
import { SHOW_ERROR, HIDE_ERROR, isErrorAction } from '../actions/error'

function errorMessage(state = '', action: AppAction) {
  if (!isErrorAction(action)) return state

  switch (action.type) {
    case SHOW_ERROR:
      return action.payload.errorMessage

    case HIDE_ERROR:
      return ''

    default:
      return state
  }
}

export default errorMessage
