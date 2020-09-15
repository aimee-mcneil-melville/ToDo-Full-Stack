import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithRouter } from '../testing/utils'
import '@testing-library/jest-dom'

import { Cart } from './Cart'

import mockCart from '../testing/mockCart'
import mockOrders from '../testing/mockOrders'

import { createOrder } from '../coordinators/cart'
import { placeOrder } from '../coordinators/orders'

jest.mock('../coordinators/cart', () => {
  return {
    createOrder: jest.fn()
  }
})

jest.mock('../coordinators/orders', () => {
  return {
    placeOrder: jest.fn()
  }
})

test('renders cart when in props', async () => {
  const mockChild = <>mock child fragment</>
  const { asFragment } = renderWithRouter(<Cart cart={mockCart}>
    {mockChild}</Cart>)

  const cartHeaders = await screen.getAllByRole('columnheader')
  const productCells = await screen.getAllByRole('cell')
  const quantityInputs = await screen.getAllByRole('textbox')

  expect(cartHeaders).toHaveLength(3)
  expect(productCells[0]).toHaveTextContent('mocked cart item 1')
  expect(quantityInputs).toHaveLength(3)
  expect(asFragment()).toMatchSnapshot()
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

test('renders a start shopping message when cart is empty', async () => {
  const { asFragment } = renderWithRouter(<Cart cart={[]}/>)
  const table = await screen.queryByRole('table')
  const emptyMessage = await screen.getByText('cart is empty', { exact: false })

  expect(table).not.toBeInTheDocument()
  expect(emptyMessage).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})
