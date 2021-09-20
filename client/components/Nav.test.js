import React from 'react'
import { screen, render } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import Nav from './Nav'
import { isAuthenticated } from '../auth-utils'

jest.mock('../auth-utils')

afterEach(() => {
  return jest.resetAllMocks()
})

test('Nav displays log off if user is Authenticated', () => {
  expect.assertions(1)
  isAuthenticated.mockImplementation(() => true)

  render(<Nav />)
  expect(screen.getByText(/log out/i)).toBeInTheDocument()
})
