import { SHOW_ERROR, HIDE_ERROR } from '../actions/error'

function errorMessage (state = '', action) {
  switch (action.type) {
    case SHOW_ERROR:
      return action.errorMessage

    case HIDE_ERROR:
      return ''

    default:
      return state
  }
}

export default errorMessage
