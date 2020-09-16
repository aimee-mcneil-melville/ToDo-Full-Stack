import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import ProductListItem from './ProductListItem'

const product = {
  id: 1,
  name: 'mocked product',
  description: 'snazzy product',
  country: 'testlandia'
}

test('renders product correctly', () => {
  const { asFragment } = render(<ProductListItem product={product} />)
  expect(asFragment()).toMatchSnapshot()
})

test('calls addToCart on add to cart button click', async () => {
  const addToCart = jest.fn()
  render(<ProductListItem product={product} addToCart={addToCart} />)

  const addButton = await screen.getByRole('button', { name: 'Add to cart' })
  fireEvent.click(addButton)

  expect(addToCart).toHaveBeenCalled()
})
