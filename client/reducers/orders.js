import {
  FETCH_ORDERS_SUCCESS,
  POST_ORDER_SUCCESS,
  PATCH_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS
} from '../actions/orders'

const orders = (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return action.orders

    case POST_ORDER_SUCCESS:
      return [ ...state, action.order ]

    case PATCH_ORDER_SUCCESS:
      return state.map(ord => (ord.id === action.order.id) ? action.order : ord)

    case DELETE_ORDER_SUCCESS:
      return state.filter(order => order.id !== action.orderId)

    default:
      return state
  }
}

export default orders
