import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithRouter, renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom'

import { Cart } from './Cart'
import mockCart from '../testing/mockCart'

jest.mock('./ui-helpers', () => {
  return {
    placeOrder: (cart, history, dispatch) => {
      expect(cart[2].quantity).toBe(7)
      expect(history).toHaveLength(2)
      expect(dispatch()).toMatch('i\'m a mock dispatch function')
    }
  }
})

test('renders cart when in props', async () => {
  expect.assertions(3)
  renderWithRedux(<Cart cart={mockCart} />)

  const productCells = await screen.queryAllByRole('cell')
  const cartHeaders = await screen.getAllByRole('columnheader')
  const quantityInputs = await screen.queryAllByRole('textbox')

  expect(cartHeaders).toHaveLength(3)
  expect(productCells[0]).toHaveTextContent('mocked cart item 1')
  expect(quantityInputs).toHaveLength(3)
})

test('calls placeOrder on button click', async () => {
  expect.assertions(3)

  const mockHistory = ['/', '/cart']
  const mockDispatch = () => 'i\'m a mock dispatch function'
  renderWithRedux(<Cart
    cart={mockCart}
    history={mockHistory}
    dispatch={mockDispatch}
  />)

  const orderButton = await screen.getByText('Place Order')
  fireEvent.click(orderButton)
})

test('renders a start shopping message when cart is empty', async () => {
  expect.assertions(3)
  renderWithRouter(<Cart cart={[]}/>)
  const table = await screen.queryByRole('table')
  const emptyMessage = await screen.getByText('cart is empty', { exact: false })
  expect(table).not.toBeInTheDocument()
  expect(emptyMessage).toBeInTheDocument()
  expect(screen).toMatchSnapshot()
})
