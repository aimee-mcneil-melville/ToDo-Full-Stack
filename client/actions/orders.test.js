import {
  fetchOrdersPending,
  fetchOrdersSuccess,
  postOrderPending,
  postOrderSuccess,
  patchOrderPending,
  patchOrderSuccess,
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_SUCCESS,
  POST_ORDER_PENDING,
  POST_ORDER_SUCCESS,
  PATCH_ORDER_PENDING,
  PATCH_ORDER_SUCCESS
} from './orders'

import mockOrders from '../testing/mockOrders'

test('fetchOrdersPending returns the correct action', () => {
  const action = fetchOrdersPending()
  expect(action.type).toBe(FETCH_ORDERS_PENDING)
})

test('fetchOrdersSuccess returns the correct action', () => {
  const action = fetchOrdersSuccess(mockOrders)
  expect(action.type).toBe(FETCH_ORDERS_SUCCESS)
  expect(action.orders).toHaveLength(3)
})

test('postOrderPending returns the correct action', () => {
  const action = postOrderPending()
  expect(action.type).toBe(POST_ORDER_PENDING)
})

test('postOrderSuccess returns the correct action', () => {
  const action = postOrderSuccess()
  expect(action.type).toBe(POST_ORDER_SUCCESS)
})

test('patchOrderPending returns the correct action', () => {
  const action = patchOrderPending()
  expect(action.type).toBe(PATCH_ORDER_PENDING)
})

test('patchOrderSuccess returns the correct action', () => {
  const action = patchOrderSuccess(mockOrders[0])
  expect(action.type).toBe(PATCH_ORDER_SUCCESS)
  expect(action.order.id).toBe(1)
})
