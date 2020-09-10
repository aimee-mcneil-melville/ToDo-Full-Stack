import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_CART } from '../actions/cart'
import { POST_ORDER_SUCCESS } from '../actions/orders'
import { getNewCart } from './reducer-helpers'

const cart = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return getNewCart(state, action.product)

    case DELETE_FROM_CART:
      return state.filter(item => item.id !== action.id)

    case UPDATE_CART:
      return action.cart

    case POST_ORDER_SUCCESS:
      return []

    default:
      return state
  }
}

export default cart
