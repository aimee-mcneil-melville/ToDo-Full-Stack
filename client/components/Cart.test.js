import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithRouter } from '../testing/utils'
import '@testing-library/jest-dom'

import { Cart } from './Cart'

import mockCart from '../testing/mockCart'
import mockOrders from '../testing/mockOrders'

import { createOrder, updateCartItem } from '../coordinators/cart'
import { placeOrder } from '../coordinators/orders'

jest.mock('../coordinators/cart', () => {
  return {
    createOrder: jest.fn(),
    updateCartItem: jest.fn()
  }
})

jest.mock('../coordinators/orders', () => {
  return {
    placeOrder: jest.fn()
  }
})

test('renders cart when in props', () => {
  const mockChild = <>mock child fragment</>
  const { asFragment } = renderWithRouter(<Cart cart={mockCart}>
    {mockChild}</Cart>)
  expect(asFragment()).toMatchSnapshot()
})

test('renders a start shopping message when cart is empty', () => {
  const { asFragment } = renderWithRouter(<Cart cart={[]}/>)
  expect(asFragment()).toMatchSnapshot()
})

test('calls updateCartItem on quantity update', async () => {
  renderWithRouter(<Cart
    cart={[ mockCart[0] ]}
  />)

  const quantityInput = await screen.getByRole('textbox', { name: 'quantity' })
  fireEvent.change(quantityInput, { target: { value: '5' } })

  expect(updateCartItem).toHaveBeenCalled()
})

test('calls deleteFromCart on delete button click', async () => {
  const deleteFromCart = jest.fn()

  renderWithRouter(<Cart
    cart={[ mockCart[0] ]}
    deleteFromCart={deleteFromCart}
  />)

  const deleteButton = await screen.getByRole('button', { name: 'delete' })
  fireEvent.click(deleteButton)

  expect(deleteFromCart).toHaveBeenCalledWith(1)
})

test('calls placeOrder on button click', async () => {
  const order = mockOrders[0]
  const mockHistory = []
  createOrder.mockImplementation(() => order)

  renderWithRouter(<Cart
    cart={mockCart}
    history={mockHistory}
  />)
  const orderButton = await screen.getByRole('button', { name: 'Place Order' })
  fireEvent.click(orderButton)

  expect(createOrder).toHaveBeenCalledWith(mockCart)
  expect(placeOrder).toHaveBeenCalled()
  expect(placeOrder.mock.calls[0][0]).toBe(order)
})
