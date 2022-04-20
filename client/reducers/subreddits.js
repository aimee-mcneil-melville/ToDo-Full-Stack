import { RECEIVE_POSTS } from '../actions'

function subreddits(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case RECEIVE_POSTS:
      return payload
    default:
      return state
  }
}

export default subreddits
