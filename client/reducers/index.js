import { combineReducers } from 'redux'

import user from './user'
import gardens from './gardens'
import waiting from './waiting'
import error from './error'

export default combineReducers({
  user,
  gardens,
  waiting,
  error
})
