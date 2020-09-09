export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const POST_ORDER_PENDING = 'POST_ORDER_PENDING'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const PATCH_ORDER_PENDING = 'PATCH_ORDER_PENDING'
export const PATCH_ORDER_SUCCESS = 'PATCH_ORDER_SUCCESS'

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

export const postOrderSuccess = () => {
  return {
    type: POST_ORDER_SUCCESS
  }
}

export const patchOrderPending = () => {
  return {
    type: PATCH_ORDER_PENDING
  }
}

export const patchOrderSuccess = () => {
  return {
    type: PATCH_ORDER_SUCCESS
  }
}
