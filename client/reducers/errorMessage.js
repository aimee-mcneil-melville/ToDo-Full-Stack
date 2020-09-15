import { SHOW_ERROR } from '../actions/error'

const errorMessage = (state = '', action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return action.errorMessage

    default:
      return ''
  }
}

export default errorMessage
