import { combineReducers } from 'redux'

import friendsReducer from './friendsReducer'
import songsReducer from './songsReducer'
import waitingReducer from './waitingReducers'
import friendSongsReducer from './friendSongsReducer'
import currentFriendReducer from './currentFriendReducer'

export default combineReducers({
  friends: friendsReducer,
  songs: songsReducer,
  waiting: waitingReducer,
  friendSongs: friendSongsReducer,
  currentFriend: currentFriendReducer
})
