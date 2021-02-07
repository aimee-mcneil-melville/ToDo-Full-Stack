export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'

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
