import { combineReducers } from 'redux'

import wombatsReducer from './wombats.ts'
import aardvarkReducer from './aardvarks.ts'

const reducer = combineReducers({
  wombats: wombatsReducer,
  aardvarks: aardvarkReducer,
})

export default reducer
