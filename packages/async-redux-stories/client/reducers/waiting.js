import { SHOW_ERROR, REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

function waiting(state = false, action) {
  const { type } = action

  switch (type) {
    case REQUEST_POSTS:
      return true
    case RECEIVE_POSTS:
      return false
    case SHOW_ERROR:
      return false
    default:
      return state
  }
}

export default waiting
