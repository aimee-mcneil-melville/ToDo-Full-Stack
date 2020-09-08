export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const POST_ORDER_PENDING = 'POST_ORDER_PENDING'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const PATCH_ORDER_PENDING = 'PATCH_ORDER_PENDING'
export const PATCH_ORDER_SUCCESS = 'PATCH_ORDER_SUCCESS'
export const DELETE_ORDER_PENDING = 'DELETE_ORDER_PENDING'
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS'

export const fetchOrdersPending = () => {
  return {
    type: FETCH_ORDERS_PENDING
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const postOrderPending = () => {
  return {
    type: POST_ORDER_PENDING
  }
}

export const postOrderSuccess = order => {
  return {
    type: POST_ORDER_SUCCESS,
    order: order
  }
}

export const patchOrderPending = () => {
  return {
    type: PATCH_ORDER_PENDING
  }
}

export const patchOrderSuccess = order => {
  return {
    type: PATCH_ORDER_SUCCESS,
    order: order
  }
}

export const deleteOrderPending = () => {
  return {
    type: DELETE_ORDER_PENDING
  }
}

export const deleteOrderSuccess = orderId => {
  return {
    type: DELETE_ORDER_SUCCESS,
    orderId: orderId
  }
}
