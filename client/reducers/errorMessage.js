import { SHOW_ERROR } from '../actions'

function errorMessage(state = '', action) {
  switch (action.type) {
    case SHOW_ERROR:
      return action.payload

    default:
      return state
  }
}

export default errorMessage
