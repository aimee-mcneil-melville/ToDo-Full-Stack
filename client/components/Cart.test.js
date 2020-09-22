import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom'

import { Cart } from './Cart'

import mockCart from '../testing/mockCart'

import { placeOrder } from '../coordinators/orders'

jest.mock('../coordinators/orders', () => {
  return {
    placeOrder: jest.fn()
  }
})

test('renders cart when in props', () => {
  const mockChild = <>mock child fragment</>
  const { asFragment } = renderWithRedux(<Cart cart={mockCart}>
    {mockChild}</Cart>)
  expect(asFragment()).toMatchSnapshot()
})

test('renders a start shopping message when cart is empty', () => {
  const { asFragment } = renderWithRedux(<Cart cart={[]}/>)
  expect(asFragment()).toMatchSnapshot()
})

test('calls placeOrder on button click', async () => {
  const mockHistory = []

  renderWithRedux(<Cart
    cart={[ mockCart[0] ]}
    history={mockHistory}
  />)
  const orderButton = await screen.getByRole('button', { name: 'Place Order' })
  fireEvent.click(orderButton)

  expect(placeOrder).toHaveBeenCalled()
})
