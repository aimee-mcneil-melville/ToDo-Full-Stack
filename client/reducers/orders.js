import {
  FETCH_ORDERS_SUCCESS
} from '../actions/orders'

const orders = (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return action.orders

    default:
      return state
  }
}

export default orders
