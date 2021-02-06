import {
  FETCH_ORDERS_SUCCESS,
  PATCH_ORDER_SUCCESS
} from '../actions/orders'

function orders (state = [], action) {
  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return action.orders

    case PATCH_ORDER_SUCCESS:
      return state.map(o => action.order.id === o.id ? action.order : { ...o })

    default:
      return state
  }
}

export default orders
