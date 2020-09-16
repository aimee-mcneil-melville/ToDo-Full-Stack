import orders from './orders'
import { FETCH_ORDERS_SUCCESS, PATCH_ORDER_SUCCESS } from '../actions/orders'
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

test('returns updated orders array on PATCH_ORDER_SUCCESS', () => {
  const updatedOrder = {
    id: 2,
    createdAt: '10:39:26 AM, Thu Sep 10 2020',
    status: 'cancelled',
    products: [
      {
        id: 1,
        name: 'snazzy product item',
        quantity: 2
      },
      {
        id: 2,
        name: 'snazzier product item',
        quantity: 1
      }
    ]
  }
  const action = {
    type: PATCH_ORDER_SUCCESS,
    order: updatedOrder
  }
  const newState = orders(mockOrders, action)
  expect(newState).toHaveLength(3)
  expect(newState[1].status).toBe('cancelled')
})

test('returns old state if action does not match', () => {
  const action = {
    type: 'RANDOM_TEST_ACTION_TYPE'
  }
  const newState = orders(mockOrders, action)
  expect(newState).toBe(mockOrders)
})
