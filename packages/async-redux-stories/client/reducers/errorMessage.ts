import { SHOW_ERROR, Action } from '../actions/reddit'

function errorMessage(state = '', action: Action): string {
  const { type } = action

  switch (type) {
    case SHOW_ERROR:
      return action.payload
    default:
      return state
  }
}

export default errorMessage
