import { combineReducers } from 'redux'

import page from './page.ts'
import cart from './cart.ts'

export default combineReducers({
  page,
  cart,
})
