import { combineReducers } from '@reduxjs/toolkit'
import exampleReducer from './example'

export default combineReducers({
  example: exampleReducer,
})
