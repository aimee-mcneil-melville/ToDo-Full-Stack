import { RECEIVE_POSTS } from '../actions'

function subreddits(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.payload

    default:
      return state
  }
}

export default subreddits
