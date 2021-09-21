import {
  SET_FRIENDS_SUCCESS,
  SET_FRIENDS_PENDING,
  SET_SONGS_SUCCESS,
  SET_SONGS_PENDING,
  SET_ERROR
} from '../actions/index'

function waiting (state = false, action) {
  switch (action.type) {
    case SET_FRIENDS_PENDING:
    case SET_SONGS_PENDING:
      return true

    case SET_FRIENDS_SUCCESS:
    case SET_SONGS_SUCCESS:
    case SET_ERROR:
      return false

    default:
      return state
  }
}

export default waiting
