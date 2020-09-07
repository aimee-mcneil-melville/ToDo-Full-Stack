import { combineReducers } from 'redux'

import products from './products'
import cart from './cart'
import waiting from './waiting'

export default combineReducers({
  products,
  cart,
  waiting
})
