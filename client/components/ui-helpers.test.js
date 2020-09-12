import {
  placeOrder,
  updateCartItem,
  deleteCartItem
} from './ui-helpers'

import mockCart from '../testing/mockCart'

import { addOrder } from '../api-helpers'

jest.mock('../api-helpers', () => {
  return {
    addOrder: jest.fn()
  }
})

test('placeOrder calls addOrder, pushes \'/orders\' to history', () => {
  expect.assertions(2)
  addOrder.mockImplementation(() => Promise.resolve())
  const mockDispatch = () => {}
  let history = []
  return placeOrder(mockCart, history, mockDispatch)
    .then(() => {
      expect(history[0]).toBe('/orders')
      expect(addOrder).toHaveBeenCalledWith(mockCart, mockDispatch)
    })
})

test('deleteCartItem filters cart, calls setState and dispatcher', () => {
  expect.assertions(3)
  const componentThis = {
    setState: newState => {
      expect(newState.cart).toHaveLength(2)
      expect(newState.cart[1].id).toBe(3)
    },
    props: { deleteFromCart: id => expect(id).toBe(2) }
  }
  deleteCartItem(2, mockCart, componentThis)
})

test('updateCartItem creates new cart, calls setState and dispatcher', () => {
  expect.assertions(2)
  const componentThis = {
    setState: newState => {
      expect(newState.cart[1].quantity).toBe(5)
    },
    props: { updateCart: newCart => expect(newCart[1].quantity).toBe(5) }
  }
  const updateInfo = { id: 2, quantity: 5 }
  updateCartItem(updateInfo, mockCart, componentThis)
})
