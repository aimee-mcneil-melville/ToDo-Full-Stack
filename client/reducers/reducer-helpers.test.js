import { getNewCart } from './reducer-helpers'

import mockCart from '../testing/mockCart'
import mockProducts from '../testing/mockProducts'

test('returns cart with product quantity +1 when product in cart', () => {
  const newCart = getNewCart(mockCart, mockProducts[0])
  expect(newCart).toHaveLength(3)
  expect(newCart[0].quantity).toBe(5)
})

test('returns cart with product (quantity 1) when product not in cart', () => {
  const oldCart = []
  const newCart = getNewCart(oldCart, mockProducts[0])
  expect(newCart).toHaveLength(1)
  expect(newCart[0].quantity).toBe(1)
})
