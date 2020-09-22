import { getNewCart, getUpdatedCart } from './reducer-helpers'

import mockCart from '../testing/mockCart'
import mockProducts from '../testing/mockProducts'

describe('getNewCart', () => {
  it('returns cart with product quantity +1 when product in cart', () => {
    const newCart = getNewCart(mockCart, mockProducts[0])
    expect(newCart).toHaveLength(3)
    expect(newCart[0].quantity).toBe(5)
  })

  it('returns cart with product (quantity 1) when product not in cart', () => {
    const oldCart = []
    const newCart = getNewCart(oldCart, mockProducts[0])
    expect(newCart).toHaveLength(1)
    expect(newCart[0].quantity).toBe(1)
  })
})

test('getUpdatedCart returns new cart with product quantity updated', () => {
  const updateInfo = { id: 1, quantity: '2' }
  const newCart = getUpdatedCart(mockCart, updateInfo)
  expect(newCart).toHaveLength(3)
  expect(newCart[0].quantity).toBe(2)
})
