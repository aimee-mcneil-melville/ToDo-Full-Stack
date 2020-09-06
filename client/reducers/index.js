import { combineReducers } from 'redux'

import currentPage from './current-page'
import products from './products'
import cart from './cart'
import waiting from './waiting'

export default combineReducers({
  currentPage,
  products,
  cart,
  waiting
})
