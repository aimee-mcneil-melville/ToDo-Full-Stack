import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from './SignIn'
import { signIn, isAuthenticated } from '../auth-utils'

jest.mock('../auth-utils')

// resets number of times mock has been called:
afterEach(() => {
  return jest.resetAllMocks()
})

test('a successful sign in', () => {
  signIn.mockImplementation(() => {
    return Promise.resolve()
  })
  isAuthenticated.mockImplementation(() => true)

  const history = {
    push: (path) => {
      expect(path).toBe('/friends')
      expect(signIn).toHaveBeenCalledTimes(1)
      expect(isAuthenticated).toHaveBeenCalledTimes(1)
    }
  }

  render(<SignIn history={history}/>)
  userEvent.type(screen.getByRole('textbox', { name: 'Email:' }), 'warhammer-slayer@gmail.com')
  userEvent.type(screen.getByLabelText(/password/i))

  userEvent.click(screen.getByRole('button'))
  expect.assertions(3)
})
