import {
  FETCH_ORDERS_SUCCESS,
} from '../actions/orders'

function orders (state = [], action) {
  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return action.orders

    default:
      return state
  }
}

export default orders
