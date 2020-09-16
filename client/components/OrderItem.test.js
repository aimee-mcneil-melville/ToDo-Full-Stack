import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import OrderItem from './OrderItem'

test('renders order item correctly', () => {
  const product = { name: 'cool product', quantity: 3 }
  const tableBody = document.createElement('tbody')
  const { asFragment } = render(<OrderItem product={product} />, {
    container: document.body.appendChild(tableBody)
  })
  expect(asFragment()).toMatchSnapshot()
})
