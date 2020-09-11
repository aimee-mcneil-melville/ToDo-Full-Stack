import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS } from '../actions/products'
import {
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_SUCCESS,
  POST_ORDER_PENDING,
  POST_ORDER_SUCCESS,
  PATCH_ORDER_PENDING,
  PATCH_ORDER_SUCCESS
} from '../actions/orders'
import { SHOW_ERROR } from '../actions/error'
import waiting from './waiting'

test('returns true on FETCH_PRODUCTS_PENDING', () => {
  const action = {
    type: FETCH_PRODUCTS_PENDING
  }
  const newState = waiting(false, action)
  expect(newState).toBeTruthy()
})

test('returns true on FETCH_ORDERS_PENDING', () => {
  const action = {
    type: FETCH_ORDERS_PENDING
  }
  const newState = waiting(false, action)
  expect(newState).toBeTruthy()
})

test('returns true on POST_ORDER_PENDING', () => {
  const action = {
    type: POST_ORDER_PENDING
  }
  const newState = waiting(false, action)
  expect(newState).toBeTruthy()
})

test('returns true on PATCH_ORDER_PENDING', () => {
  const action = {
    type: PATCH_ORDER_PENDING
  }
  const newState = waiting(false, action)
  expect(newState).toBeTruthy()
})

test('returns false on FETCH_PRODUCTS_SUCCESS', () => {
  const action = {
    type: FETCH_PRODUCTS_SUCCESS
  }
  const newState = waiting(true, action)
  expect(newState).toBeFalsy()
})

test('returns false on FETCH_ORDERS_SUCCESS', () => {
  const action = {
    type: FETCH_ORDERS_SUCCESS
  }
  const newState = waiting(true, action)
  expect(newState).toBeFalsy()
})

test('returns false on POST_ORDER_SUCCESS', () => {
  const action = {
    type: POST_ORDER_SUCCESS
  }
  const newState = waiting(true, action)
  expect(newState).toBeFalsy()
})

test('returns false on PATCH_ORDER_SUCCESS', () => {
  const action = {
    type: PATCH_ORDER_SUCCESS
  }
  const newState = waiting(true, action)
  expect(newState).toBeFalsy()
})

test('returns false on SHOW_ERROR', () => {
  const action = {
    type: SHOW_ERROR
  }
  const newState = waiting(true, action)
  expect(newState).toBeFalsy()
})

test('returns old state if action does not match', () => {
  const action = {
    type: 'RANDOM_TEST_ACTION_TYPE'
  }
  const newState = waiting(false, action)
  expect(newState).toBeFalsy()
})
