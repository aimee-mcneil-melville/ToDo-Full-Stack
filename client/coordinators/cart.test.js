import { addCartItem, updateCartItem } from './cart'

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

describe('updateCartItem', () => {
  it('creates new cart and calls dispatcher', () => {
    const updatedInfo = { id: 1, quantity: '5' }
    const updateCart = jest.fn()

    updateCartItem(updatedInfo, mockCart, updateCart)

    const newCart = updateCart.mock.calls[0][0]
    expect(Object.is(newCart, mockCart)).toBeFalsy()
    expect(newCart[0].quantity).toBe(5)
  })

  it('does not update if newQuantity is invalid', () => {
    const updatedInfo = { id: 1, quantity: 'hello' }
    const updateCart = jest.fn()

    updateCartItem(updatedInfo, mockCart, updateCart)

    expect(updateCart).not.toHaveBeenCalled()
  })
})
