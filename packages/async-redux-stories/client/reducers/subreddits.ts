import { Action, Posts, RECEIVE_POSTS } from '../actions'

const initialState = [] as any[]

function subreddits(state = initialState, action: Action): Posts {
  const { type, payload } = action

  switch (type) {
    case RECEIVE_POSTS:
      return payload
    default:
      return state
  }
}

export default subreddits
