import { SET_CURRENT_FRIEND_SONGS } from '../actions/index.js'

const friendSongsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_FRIEND_SONGS:
      return action.songs
    default:
      return state
  }
}

export default friendSongsReducer
