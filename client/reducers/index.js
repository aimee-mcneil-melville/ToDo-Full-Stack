import { combineReducers } from 'redux'

import user from './user'
import waiting from './waiting'

export default combineReducers({
  user,
  waiting
})
