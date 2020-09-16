import { addCartItem, updateCartItem, createOrder } from './cart'

import mockProducts from '../testing/mockProducts'
import mockCart from '../testing/mockCart'

test('addCartItem calls dispatcher and redirects correctly', () => {
  const product = mockProducts[0]
  let history = []
  const addToCart = jest.fn()

  addCartItem(product, history, addToCart)

  expect(history[0]).toBe('/cart')
  expect(addToCart).toHaveBeenCalledWith({ id: 1, name: 'mocked product 1' })
})

test('updateCartItem creates new cart and calls dispatcher', () => {
  const updatedInfo = { id: 1, quantity: 5 }
  const updateCart = jest.fn()

  updateCartItem(updatedInfo, mockCart, updateCart)

  const expectedCart = [ ...mockCart ]
  expectedCart[0].quantity = 5

  expect(updateCart).toHaveBeenCalledWith(expectedCart)
  expect(Object.is(updateCart.mock.calls[0][0], mockCart)).toBeFalsy()
})

test('createOrder creates an order', () => {
  const order = createOrder(mockCart)

  expect(order).toHaveLength(3)
  expect(Object.is(order, mockCart)).toBeFalsy()
  expect(order[0]).not.toHaveProperty('name')
})
