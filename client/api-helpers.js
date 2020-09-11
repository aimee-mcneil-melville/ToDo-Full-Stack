import { showError } from './actions/error'
import { fetchProductsPending, fetchProductsSuccess } from './actions/products'
import {
  fetchOrdersPending,
  fetchOrdersSuccess,
  postOrderPending,
  postOrderSuccess,
  patchOrderPending,
  patchOrderSuccess
} from './actions/orders'

import {
  fetchProducts,
  fetchOrders,
  postOrder,
  patchOrder
} from './api'

export function getProducts (dispatch) {
  dispatch(fetchProductsPending())
  return fetchProducts()
    .then(products => {
      dispatch(fetchProductsSuccess(products))
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}

export function getOrders (dispatch) {
  dispatch(fetchOrdersPending())
  return fetchOrders()
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
    .then(() => {
      dispatch(postOrderSuccess())
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}

export function updateOrder (id, orderChanges, dispatch) {
  dispatch(patchOrderPending())
  return patchOrder(id, orderChanges)
    .then(() => {
      dispatch(patchOrderSuccess())
    })
    .catch(err => {
      dispatch(showError(err.message))
    })
}
