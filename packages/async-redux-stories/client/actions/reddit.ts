import type { ThunkAction } from '../store'
import { Post, RawPostArr } from '../posts'

import { fetchSubreddit } from '../apis/reddit'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SHOW_ERROR = 'SHOW_ERROR'

export type Action =
| { type: typeof REQUEST_POSTS; payload: undefined }
| { type: typeof RECEIVE_POSTS; payload: Post[] }
| { type: typeof SHOW_ERROR; payload: string }

export function requestPosts(): Action {
  return {
    type: REQUEST_POSTS,
  } as Action
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
  return (dispatch) => {
    dispatch(requestPosts())
    return fetchSubreddit(subreddit)
      .then((posts) => {
        dispatch(receivePosts(posts))
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}
