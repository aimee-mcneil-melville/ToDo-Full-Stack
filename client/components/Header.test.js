import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../testing/utils'
import '@testing-library/jest-dom'

import Header from './Header'

test('renders header correctly', async () => {
  const { asFragment } = renderWithRouter(<Header />)

  const nav = await screen.getByRole('navigation')
  const header = await screen.getByRole('heading')

  expect(nav.children).toHaveLength(3)
  expect(header).toHaveTextContent('Sweet As Organics')
  expect(asFragment()).toMatchSnapshot()
})
