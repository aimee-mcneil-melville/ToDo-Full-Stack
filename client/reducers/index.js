import { combineReducers } from 'redux'

import user from './user'
import location from './location'
import waiting from './waiting'
import error from './error'

export default combineReducers({
  user,
  location,
  waiting,
  error
})
