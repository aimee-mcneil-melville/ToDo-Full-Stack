import { ADD_TO_CART, UPDATE_CART, DELETE_FROM_CART } from '../actions/cart'
import { POST_ORDER_SUCCESS } from '../actions/orders'
import cart from './cart'

import mockCart from '../testing/mockCart'

import { getNewCart, getUpdatedCart } from './reducer-helpers.js'
jest.mock('./reducer-helpers', () => {
  return {
    getNewCart: jest.fn(),
    getUpdatedCart: jest.fn()
  }
})

test('returns the result of getNewCart on ADD_TO_CART', () => {
  getNewCart.mockImplementation(() => mockCart)
  const oldState = [ mockCart[0], mockCart[1] ]
  const action = {
    type: ADD_TO_CART,
    product: mockCart[2]
  }
  const newState = cart(oldState, action)
  expect(newState).toHaveLength(3)
  expect(getNewCart).toHaveBeenCalled()
})

test('returns state with deleted item removed on DELETE_FROM_CART', () => {
  const action = {
    type: DELETE_FROM_CART,
    id: 1
  }
  const newState = cart(mockCart, action)
  expect(newState).toHaveLength(2)
  expect(newState[0].id).toBe(2)
})

test('returns the result of getUpdatedCart on UPDATE_CART', () => {
  getUpdatedCart.mockImplementation(() => mockCart)
  const action = {
    type: UPDATE_CART,
    updateInfo: { id: 1, quantity: 2 }
  }
  const newState = cart([], action)
  expect(newState).toHaveLength(3)
  expect(getUpdatedCart).toHaveBeenCalled()
})

test('returns empty array on POST_ORDER_SUCCESS', () => {
  const action = {
    type: POST_ORDER_SUCCESS
  }
  const newState = cart(mockCart, action)
  expect(newState).toHaveLength(0)
})

test('returns old state if action does not match', () => {
  const action = {
    type: 'RANDOM_TEST_ACTION_TYPE'
  }
  const newState = cart(mockCart, action)
  expect(newState).toBe(mockCart)
})
