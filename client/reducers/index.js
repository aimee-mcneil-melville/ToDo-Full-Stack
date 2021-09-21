import { combineReducers } from 'redux'

import friendsReducer from './friendsReducer'
import songsReducer from './songsReducer'
import waitingReducer from './waitingReducers'

export default combineReducers({
  friends: friendsReducer,
  songs: songsReducer,
  waiting: waitingReducer
})
