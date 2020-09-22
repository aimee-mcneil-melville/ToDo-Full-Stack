import {
  addToCart,
  updateCart,
  deleteFromCart,
  ADD_TO_CART,
  UPDATE_CART,
  DELETE_FROM_CART
} from './cart'

import mockCart from '../testing/mockCart'

test('addToCart returns the correct action', () => {
  const action = addToCart(mockCart[0])

  expect(action.type).toBe(ADD_TO_CART)
  expect(action.product.name).toBe('mocked cart item 1')
})

test('updateCart returns the correct action', () => {
  const updateInfo = { id: 1, quantity: 2 }
  const action = updateCart(updateInfo)

  expect(action.type).toBe(UPDATE_CART)
  expect(action.updateInfo).toBe(updateInfo)
})

test('deleteFromCart returns the correct action', () => {
  const action = deleteFromCart(1)

  expect(action.type).toBe(DELETE_FROM_CART)
  expect(action.id).toBe(1)
})
