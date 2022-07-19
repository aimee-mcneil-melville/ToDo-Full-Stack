import request from 'superagent'

export const SHOW_ERROR = 'SHOW_ERROR'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'

export function requestPosts() {
  return {
    type: REQUEST_POSTS,
  }
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    payload: posts.map((post) => post.data),
  }
}

export function showError(errorMessage) {
  return {
    type: SHOW_ERROR,
    payload: errorMessage,
  }
}

export function fetchPosts(subreddit) {
  return (dispatch) => {
    dispatch(requestPosts())
    return request
      .get(`/api/v1/reddit/subreddit/${subreddit}`)
      .then((res) => {
        dispatch(receivePosts(res.body))
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}
