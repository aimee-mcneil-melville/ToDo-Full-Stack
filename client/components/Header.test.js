import React from 'react'
import { renderWithRouter } from '../testing/utils'
import '@testing-library/jest-dom'

import Header from './Header'

test('renders header correctly', () => {
  const { asFragment } = renderWithRouter(<Header />)

  expect(asFragment()).toMatchSnapshot()
})
