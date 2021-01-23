import { SHOW_ERROR, HIDE_ERROR } from '../actions/error'

function error (state = null, action) {
  switch (action.type) {
    case SHOW_ERROR:
      return action.errorMessage

    case HIDE_ERROR:
      return null

    default:
      return state
  }
}

export default error
