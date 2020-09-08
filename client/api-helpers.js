import { showError } from './actions/error'
import { fetchProductsPending, fetchProductsSuccess } from './actions/products'
import {
  fetchOrdersPending,
  fetchOrdersSuccess,
  postOrderPending,
  postOrderSuccess,
  patchOrderPending,
  patchOrderSuccess,
  deleteOrderPending,
  deleteOrderSuccess
} from './actions/orders'

import {
  fetchProducts,
  fetchOrders,
  postOrder,
  patchOrder,
  deleteOrder
} from './api'

export function getProducts (dispatch) {
  dispatch(fetchProductsPending())
  fetchProducts()
    .then(products => {
      dispatch(fetchProductsSuccess(products))
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}

export function getOrders (dispatch) {
  dispatch(fetchOrdersPending())
  fetchOrders()
    .then(orders => {
      dispatch(fetchOrdersSuccess(orders))
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}

// These helpers are returning the api call promises, because the component
// needs to know when the call is done to redirect the user.
export function addOrder (order, dispatch) {
  dispatch(postOrderPending())
  return postOrder(order)
    .then(newOrder => {
      dispatch(postOrderSuccess(newOrder))
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}

export function updateOrder (order, dispatch) {
  dispatch(patchOrderPending())
  return patchOrder(order)
    .then(updatedOrder => {
      dispatch(patchOrderSuccess(updatedOrder))
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}

export function cancelOrder (id, dispatch) {
  dispatch(deleteOrderPending())
  deleteOrder(id)
    .then(() => {
      dispatch(deleteOrderSuccess(id))
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}
