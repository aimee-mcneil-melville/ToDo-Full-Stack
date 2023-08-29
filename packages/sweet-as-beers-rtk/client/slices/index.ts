import { combineReducers } from '@reduxjs/toolkit'
import exampleReducer from './example.ts'

export default combineReducers({
  example: exampleReducer,
})
