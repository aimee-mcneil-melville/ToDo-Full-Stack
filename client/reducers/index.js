import { combineReducers } from 'redux'

import user from './user'
import location from './location'
import waiting from './waiting'
import error from './error'
import garden from './garden'

export default combineReducers({
  user,
  location,
  waiting,
  error,
  garden,
})
