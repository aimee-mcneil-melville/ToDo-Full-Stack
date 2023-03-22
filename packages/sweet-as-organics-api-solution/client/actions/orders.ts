import { AppAction } from '.'
import {
  CartItemWithQuantity,
  OrderStatus,
  OrderWithProducts,
} from '../../common/interfaces'
import { postOrder, getOrders, patchOrderStatus } from '../api/orders'
import { AppThunkAction } from '../store'
import { showError } from './error'

export type OrderAction =
  | { type: typeof PLACE_ORDER_PENDING }
  | { type: typeof PLACE_ORDER_SUCCESS }
  | { type: typeof FETCH_ORDERS_PENDING }
  | {
      type: typeof FETCH_ORDERS_SUCCESS
      payload: { orders: OrderWithProducts[] }
    }
  | { type: typeof PATCH_ORDER_STATUS_PENDING }
  | {
      type: typeof PATCH_ORDER_STATUS_SUCCESS
      payload: { order: OrderWithProducts }
    }

export const isOrderAction = (action: AppAction) => {
  return action.type.includes('_ORDERS_') || action.type.includes('_ORDER_')
}

export const PLACE_ORDER_PENDING = 'PLACE_ORDER_PENDING'
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS'

export function placeOrderPending(): OrderAction {
  return {
    type: PLACE_ORDER_PENDING,
  }
}

export function placeOrderSuccess(): OrderAction {
  return {
    type: PLACE_ORDER_SUCCESS,
  }
}

export function placeOrder(
  order: CartItemWithQuantity[],
  onSuccess?: () => void
): AppThunkAction {
  return (dispatch) => {
    dispatch(placeOrderPending())
    return postOrder(order)
      .then(() => {
        dispatch(placeOrderSuccess())
        if (onSuccess) {
          onSuccess()
        }
      })
      .catch((err: unknown) => {
        let errMessage: string
        if (err instanceof Error) {
          errMessage = err.message
        } else {
          errMessage =
            (err as { response?: { text: string } }).response?.text || ''
        }
        dispatch(showError(errMessage))
      })
  }
}

export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'

export function fetchOrdersPending(): OrderAction {
  return {
    type: FETCH_ORDERS_PENDING,
  }
}

export function fetchOrdersSuccess(orders: OrderWithProducts[]): OrderAction {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: {
      orders,
    },
  }
}

export function fetchOrders(): AppThunkAction {
  return (dispatch) => {
    dispatch(fetchOrdersPending())
    return getOrders()
      .then((orders) => {
        dispatch(fetchOrdersSuccess(orders))
      })
      .catch((err) => {
        const errMessage = err.response?.text || err.message
        dispatch(showError(errMessage))
      })
  }
}

export const PATCH_ORDER_STATUS_SUCCESS = 'PATCH_ORDER_STATUS_SUCCESS'
export const PATCH_ORDER_STATUS_PENDING = 'PATCH_ORDER_STATUS_PENDING'

export function patchOrderPending(): OrderAction {
  return {
    type: PATCH_ORDER_STATUS_PENDING,
  }
}

export function patchOrderSuccess(order: OrderWithProducts): OrderAction {
  return {
    type: PATCH_ORDER_STATUS_SUCCESS,
    payload: {
      order,
    },
  }
}

export function updateOrderStatus(
  id: number,
  status: OrderStatus
): AppThunkAction {
  return (dispatch) => {
    dispatch(patchOrderPending())
    return patchOrderStatus(id, status)
      .then((updatedOrder) => {
        console.log(updatedOrder)
        dispatch(patchOrderSuccess(updatedOrder))
      })
      .catch((err) => {
        const errMessage = err.response?.text || err.message
        dispatch(showError(errMessage))
      })
  }
}
