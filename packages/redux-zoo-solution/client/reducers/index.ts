import { combineReducers } from 'redux'

import wombatsReducer from './wombats'
import aardvarkReducer from './aardvarks'

const reducer = combineReducers({
  wombats: wombatsReducer,
  aardvarks: aardvarkReducer,
})

export default reducer
