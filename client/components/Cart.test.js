import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom'

import Cart from './Cart'
import mockCart from '../testing/mockCart'

test('<Cart /> renders cart from store', async () => {
  renderWithRedux(<Cart />, { initialState: { cart: mockCart } })
  const cartItems = await screen.findAllByText('mocked cart item 1')
  expect(cartItems).toHaveLength(1)
})
