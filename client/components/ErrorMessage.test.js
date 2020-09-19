import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ErrorMessage } from './ErrorMessage'

test('renders the error message from props', () => {
  const errorMessage = 'mock error message'
  const { asFragment } = render(<ErrorMessage errorMessage={errorMessage} />)

  expect(asFragment()).toMatchSnapshot()
})

test('calls hideError on hide error button click', async () => {
  const errorMessage = 'mock error message'
  const hideError = jest.fn()
  render(<ErrorMessage errorMessage={errorMessage} hideError={hideError} />)

  const hideButton = await screen.getByRole('button', { name: 'Hide Error' })
  fireEvent.click(hideButton)

  expect(hideError).toHaveBeenCalled()
})
