import { combineReducers } from 'redux'

import users from './users.ts'
import user from './user.ts'

export default combineReducers({
  users,
  user,
})
