import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../test-utils'
import WaitIndicator from './WaitIndicator.jsx'

test('shows wait indicator if waiting is true', () => {
  renderWithRedux(<WaitIndicator />, {
    initialState: { waiting: true }
  })
  const waitIndicator = screen.getByText('WAITING')
  expect(waitIndicator).toBeInTheDocument()
})

test('renders null if waiting is false', () => {
  renderWithRedux(<WaitIndicator />)
  const waitIndicator = screen.queryByText('WAITING')
  expect(waitIndicator).toBeNull()
})
