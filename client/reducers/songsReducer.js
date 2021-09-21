import { SET_SONGS_SUCCESS } from '../actions/index.js'

const songsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SONGS_SUCCESS:
      return action.songs
    default:
      return state
  }
}

export default songsReducer
