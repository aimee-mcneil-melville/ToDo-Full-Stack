import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { WaitIndicator } from './WaitIndicator'

test('renders wait indicator when waiting is true', () => {
  const { asFragment } = render(<WaitIndicator waiting={true} />)
  expect(asFragment()).toMatchSnapshot()
})

test('renders nothing when waiting is false', () => {
  const { asFragment } = render(<WaitIndicator waiting={false} />)
  expect(asFragment()).toMatchSnapshot()
})
