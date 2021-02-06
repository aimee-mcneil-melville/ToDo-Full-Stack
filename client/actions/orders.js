export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const POST_ORDER_PENDING = 'POST_ORDER_PENDING'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const PATCH_ORDER_PENDING = 'PATCH_ORDER_PENDING'
export const PATCH_ORDER_SUCCESS = 'PATCH_ORDER_SUCCESS'

export function fetchOrdersPending () {
  return {
    type: FETCH_ORDERS_PENDING
  }
}

export function fetchOrdersSuccess (orders) {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export function postOrderPending () {
  return {
    type: POST_ORDER_PENDING
  }
}

export function postOrderSuccess () {
  return {
    type: POST_ORDER_SUCCESS
  }
}

export function patchOrderPending () {
  return {
    type: PATCH_ORDER_PENDING
  }
}

export function patchOrderSuccess (order) {
  return {
    type: PATCH_ORDER_SUCCESS,
    order: order
  }
}
