import { combineReducers } from 'redux'

import wombatsReducer from './wombats.ts'

const reducer = combineReducers({
  wombats: wombatsReducer,
})

export default reducer
