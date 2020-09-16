import React from 'react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom'

import { OrderList } from './OrderList'

import mockOrders from '../testing/mockOrders'

import { getOrders } from '../coordinators/orders'

jest.mock('../coordinators/orders', () => {
  return {
    getOrders: jest.fn()
  }
})

test('renders a list of orders correctly', () => {
  const mockChild = <>mock child component</>
  const { asFragment } = renderWithRedux(<OrderList orders={mockOrders}>
    {mockChild}</OrderList>)
  expect(asFragment()).toMatchSnapshot()
})

test('calls getOrders on mount', () => {
  renderWithRedux(<OrderList orders={mockOrders} />)
  expect(getOrders).toHaveBeenCalled()
})
