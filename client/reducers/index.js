import { combineReducers } from 'redux'

import friendsReducer from './friendsReducer'
import songsReducer from './songsReducer'
import waitingReducer from './waitingReducers'
import friendSongsReducer from './friendSongsReducer'
import currentFriendReducer from './currentFriendReducer'
import userReducer from './userReducer'

export default combineReducers({
  user: userReducer,
  userSongs: songsReducer,
  friends: friendsReducer,
  currentFriend: currentFriendReducer,
  currentFriendSongs: friendSongsReducer,
  waiting: waitingReducer
})
