import orders from './orders'
import { FETCH_ORDERS_SUCCESS } from '../actions/orders'
import mockOrders from '../testing/mockOrders'

test('returns orders array on FETCH_ORDERS_SUCCESS', () => {
  const action = {
    type: FETCH_ORDERS_SUCCESS,
    orders: mockOrders
  }
  const newState = orders([], action)
  expect(newState).toHaveLength(3)
  expect(newState[0].status).toBe('cancelled')
})

test('returns old state if action does not match', () => {
  const action = {
    type: 'RANDOM_TEST_ACTION_TYPE'
  }
  const newState = orders(mockOrders, action)
  expect(newState).toBe(mockOrders)
})
