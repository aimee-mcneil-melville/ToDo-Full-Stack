import { Action, RECEIVE_POSTS } from '../actions/reddit.ts'
import { Post } from '../../models/post.ts'

const initialState: Post[] = []

function subreddits(state = initialState, action: Action): Post[] {
  const { type, payload } = action

  switch (type) {
    case RECEIVE_POSTS:
      return payload
    default:
      return state
  }
}

export default subreddits
