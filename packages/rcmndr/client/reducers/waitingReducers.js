import {
  SET_FRIENDS,
  SET_FRIENDS_PENDING,
  SET_SONGS,
  SET_SONGS_PENDING,
  SET_ERROR,
  SET_CURRENT_FRIEND_SONGS
} from '../actions/index'

function waiting (state = false, action) {
  switch (action.type) {
    case SET_FRIENDS_PENDING:
    case SET_SONGS_PENDING:
      return true

    case SET_FRIENDS:
    case SET_SONGS:
    case SET_ERROR:
    case SET_CURRENT_FRIEND_SONGS:
      return false

    default:
      return state
  }
}

export default waiting
