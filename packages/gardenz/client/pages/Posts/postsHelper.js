import requestor from '../../consume'
import { dispatch } from '../../store'
import { setWaiting, clearWaiting } from '../../actions/waiting'
import { showError } from '../../actions/error'

export function getPosts (gardenId, consume = requestor) {
  dispatch(setWaiting())
  return consume(`/posts/${gardenId}`)
    // front end url does not match back end. It is flipped around.
    .then((res) => {
      dispatch(clearWaiting())
      return res.body.posts
    })
    .catch((error) => {
      dispatch(showError(error.message))
    })
}
