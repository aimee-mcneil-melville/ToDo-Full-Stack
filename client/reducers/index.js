import { combineReducers } from 'redux'

import user from './user'
import gardens from './gardens'

export default combineReducers({
  user,
  gardens
})
