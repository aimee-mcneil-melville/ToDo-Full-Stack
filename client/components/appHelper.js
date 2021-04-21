import { getFriends } from '../apis/friends.js'
import {
  setFriends,
  getFriendsPending,
  setError
} from '../actions'

export function fetchFriends (dispatch) {
  dispatch(getFriendsPending())
  return getFriends()
    .then(friends => {
      dispatch(setFriends(friends))
      return null
    })
    .catch(err => {
      dispatch(setError(err.message))
    })
}
