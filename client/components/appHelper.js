import { getFriends } from '../apis/friends.js'
import {
  setFriendsSuccess,
  setFriendsPending,
  setError
} from '../actions'

export function fetchFriends (dispatch, id) {
  dispatch(setFriendsPending())
  return getFriends(id)
    .then(friends => {
      dispatch(setFriendsSuccess(friends))
      return null
    })
    .catch(err => {
      dispatch(setError(err.message))
    })
}
