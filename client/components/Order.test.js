import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Order } from './Order'

import mockOrders from '../testing/mockOrders'

import { updateOrder } from '../coordinators/orders'
jest.mock('../coordinators/orders', () => {
  return {
    updateOrder: jest.fn()
  }
})

test('renders pending order correctly', () => {
  const order = mockOrders[1]
  const { asFragment } = render(<Order order={order} />)

  expect(asFragment()).toMatchSnapshot()
})

test('renders cancelled order correctly', () => {
  const order = mockOrders[0]
  const { asFragment } = render(<Order order={order} />)

  expect(asFragment()).toMatchSnapshot()
})

test('calls updateOrder on cancel button click', async () => {
  const order = mockOrders[1]
  render(<Order order={order} />)

  const cancelButton = await screen.getByRole('button', { name: 'Cancel Order' })
  fireEvent.click(cancelButton)

  expect(updateOrder).toHaveBeenCalled()
})
