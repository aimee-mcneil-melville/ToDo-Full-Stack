import { combineReducers } from 'redux'

import errorMessage from './errorMessage'
import subreddits from './subreddits'
import waiting from './waiting'

export default combineReducers({
  errorMessage,
  subreddits,
  waiting
})
