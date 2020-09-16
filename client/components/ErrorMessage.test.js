import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ErrorMessage } from './ErrorMessage'

test('renders the error message from props', async () => {
  const errorMessage = 'mock error message'
  const { asFragment } = render(<ErrorMessage errorMessage={errorMessage} />)

  expect(asFragment()).toMatchSnapshot()
})
