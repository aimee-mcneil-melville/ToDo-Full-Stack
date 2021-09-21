import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from './SignIn'
import { signIn, isAuthenticated } from '../auth-utils'

// We have mocked out the signIn so that it won't call into authenticare's signIn. This is because authenticare's signIn function will call into the backend, we don't want that to happen. We just want to focus on the SignIn component for this test.
// This mock-up is occuring below with jest.mock, and with signIn.mockImplementation(() => ...

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

  // Below is the crux of our test, it tests line 26 in SignIn.jsx, to confirm that isAuthenticated directs us to '/friends':

  const history = {
    push: (path) => {
      expect(path).toBe('/friends')
      expect(signIn).toHaveBeenCalledTimes(1)
      expect(isAuthenticated).toHaveBeenCalledTimes(1)
    }
  }

  // rendering SignIn component which is rendering everything in SignIn.jsx.
  // it is basically acting like a browser... it takes everything and passes it to testing library

  render(<SignIn history={history}/>)
  // screen and render work together. The assertion below says give me the textbox with the name email and type into it... does this return anything? The following assertion does the same for the password label.

  userEvent.type(screen.getByRole('textbox', { name: 'Email:' }), 'warhammer-slayer@gmail.com')
  userEvent.type(screen.getByLabelText(/password/i), 'Hello123')

  // The below is testing whether the button clicks. It get the button by finding the thing with a 'role: button'.

  userEvent.click(screen.getByRole('button'))
  expect.assertions(3)
})
