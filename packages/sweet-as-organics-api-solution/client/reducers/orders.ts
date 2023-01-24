import { OrderWithProducts } from '../../common/interfaces'
import { AppAction } from '../actions'
import {
  FETCH_ORDERS_SUCCESS,
  isOrderAction,
  PATCH_ORDER_STATUS_SUCCESS,
} from '../actions/orders'

const initialState: OrderWithProducts[] = []

export default function ordersReducer(state = initialState, action: AppAction) {
  if (!isOrderAction(action)) return state

  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return action.payload.orders
    case PATCH_ORDER_STATUS_SUCCESS:
      return state.map((order) => {
        if (order.id === action.payload.order.id) {
          return {
            ...order,
            status: action.payload.order.status,
          }
        }
        return order
      })
    default:
      return state
  }
}
