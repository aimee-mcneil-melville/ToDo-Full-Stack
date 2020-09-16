import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ProductList } from './ProductList'

import mockProducts from '../testing/mockProducts'

import { getProducts } from '../coordinators/products'
import { addCartItem } from '../coordinators/cart'

jest.mock('../coordinators/products', () => {
  return {
    getProducts: jest.fn()
  }
})

jest.mock('../coordinators/cart', () => {
  return {
    addCartItem: jest.fn()
  }
})

test('renders a list of products correctly', () => {
  const mockChild = <>mock child component</>
  const { asFragment } = render(<ProductList products={mockProducts}>
    {mockChild}</ProductList>)
  expect(asFragment()).toMatchSnapshot()
})

test('calls getOrders on mount', () => {
  render(<ProductList products={mockProducts} />)
  expect(getProducts).toHaveBeenCalled()
})

test('calls addCartItem on add to cart button click', async () => {
  render(<ProductList products={[ mockProducts[0] ]} />)

  const addButton = await screen.getByRole('button', { name: 'Add to cart' })
  fireEvent.click(addButton)

  expect(addCartItem).toHaveBeenCalled()
})
