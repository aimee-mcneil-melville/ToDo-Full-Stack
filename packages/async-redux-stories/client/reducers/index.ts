import { combineReducers } from 'redux'

import errorMessage from './errorMessage.ts'
import subreddits from './subreddits.ts'
import waiting from './waiting.ts'

export default combineReducers({
  errorMessage,
  subreddits,
  waiting,
})
