import { SET_SONGS } from '../actions/index.js'

const songsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SONGS:
      return action.songs
    default:
      return state
  }
}

export default songsReducer
