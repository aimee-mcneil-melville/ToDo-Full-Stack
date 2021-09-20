import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from './Register'
import { register, isAuthenticated } from '../auth-utils'

jest.mock('../auth-utils')

// resets number of times mock has been called:
afterEach(() => {
  return jest.resetAllMocks()
})

test('a successful register', () => {
  expect.assertions(3)

  register.mockImplementation(() => {
    return Promise.resolve()
  })
  isAuthenticated.mockImplementation(() => true)

  const history = {
    push: (path) => {
      expect(path).toBe('/friends')
      expect(register).toHaveBeenCalledTimes(1)
      expect(isAuthenticated).toHaveBeenCalledTimes(1)
    }
  }
  render(<Register history={history}/>)
  userEvent.type(screen.getByRole('textbox', { name: 'First Name:' }), 'Bob')
  userEvent.type(screen.getByRole('textbox', { name: 'Last Name:' }), 'Bob')
  userEvent.click(screen.getByRole('button'))
})
