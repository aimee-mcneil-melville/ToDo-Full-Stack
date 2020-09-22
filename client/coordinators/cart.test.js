import { addCartItem, updateCartItem } from './cart'

import mockProducts from '../testing/mockProducts'

test('addCartItem calls dispatcher and redirects correctly', () => {
  const product = mockProducts[0]
  let history = []
  const addToCart = jest.fn()

  addCartItem(product, history, addToCart)

  expect(history[0]).toBe('/cart')
  expect(addToCart).toHaveBeenCalledWith({ id: 1, name: 'mocked product 1' })
})

describe('updateCartItem', () => {
  it('calls dispatcher with updateInfo if quantity is valid', () => {
    const updatedInfo = { id: 1, quantity: '5' }
    const updateCart = jest.fn()

    updateCartItem(updatedInfo, updateCart)

    expect(updateCart).toHaveBeenCalled()
  })

  it('does not call dispatcher if quantity is invalid', () => {
    const updatedInfo = { id: 1, quantity: 'hello' }
    const updateCart = jest.fn()

    updateCartItem(updatedInfo, updateCart)

    expect(updateCart).not.toHaveBeenCalled()
  })
})
