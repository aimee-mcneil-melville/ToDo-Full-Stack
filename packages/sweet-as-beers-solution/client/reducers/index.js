import { combineReducers } from 'redux'

import page from './page'
import cart from './cart'

export default combineReducers({
  page,
  cart,
})
