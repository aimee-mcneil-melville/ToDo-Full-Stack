import { combineReducers } from 'redux'

import user from './user'
import waiting from './waiting'
import error from './error'

export default combineReducers({
  user,
  waiting,
  error
})
