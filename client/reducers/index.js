import { combineReducers } from 'redux'

import friendsReducer from './friendsReducer'
import songsReducer from './songsReducer'

export default combineReducers({
  friends: friendsReducer,
  songs: songsReducer
})
