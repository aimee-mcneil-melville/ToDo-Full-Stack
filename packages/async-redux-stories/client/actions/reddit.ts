import type { ThunkAction } from '../store.ts'
import { Post, RawPostArr } from '../../models/post.ts'

import { fetchSubreddit } from '../apis/reddit.ts'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SHOW_ERROR = 'SHOW_ERROR'

export type Action =
  | { type: typeof REQUEST_POSTS; payload: null }
  | { type: typeof RECEIVE_POSTS; payload: Post[] }
  | { type: typeof SHOW_ERROR; payload: string }

export function requestPosts(): Action {
  return {
    type: REQUEST_POSTS,
    payload: null,
  }
}

export function receivePosts(posts: RawPostArr): Action {
  return {
    type: RECEIVE_POSTS,
    payload: posts.map((post) => post.data),
  }
}

export function showError(errorMessage: string): Action {
  return {
    type: SHOW_ERROR,
    payload: errorMessage,
  }
}

export function fetchPosts(subreddit: string): ThunkAction {
  return async (dispatch) => {
    dispatch(requestPosts())
    try {
      const posts = await fetchSubreddit(subreddit)
      dispatch(receivePosts(posts))
    } catch (err) {
      dispatch(showError((err as Error).message))
    }
  }
}
