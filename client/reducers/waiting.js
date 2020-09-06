import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from '../actions/products'
import { SHOW_ERROR } from '../actions/error'

const waiting = (state = false, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return true

    case RECEIVE_PRODUCTS:
      return false

    case SHOW_ERROR:
      return false

    default:
      return state
  }
}

export default waiting
