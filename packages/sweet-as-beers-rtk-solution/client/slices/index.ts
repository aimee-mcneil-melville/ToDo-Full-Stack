import { combineReducers } from '@reduxjs/toolkit'
import exampleReducer from './example.ts'
import cart from './cart.ts'
import activePage from './activePage.ts'

export default combineReducers({
  example: exampleReducer,
  cart,
  activePage
})
