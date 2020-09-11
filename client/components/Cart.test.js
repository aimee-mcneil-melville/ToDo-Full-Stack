import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom'

import { Cart } from './Cart'
import mockCart from '../testing/mockCart'

test('<Cart /> renders cart when in props', async () => {
  renderWithRedux(<Cart cart={mockCart}/>)
  // render(<Cart cart={mockCart} />)
  const tableRows = await screen.queryAllByRole('row')
  expect(tableRows).toHaveLength(4)
})

test('<Cart /> renders a start shopping message when cart is empty', async () => {
  // render(<Cart cart={[]} />)
  renderWithRedux(<Cart cart={[]}/>)
  const tableRows = await screen.queryAllByRole('row')
  expect(tableRows).toHaveLength(0)
})
