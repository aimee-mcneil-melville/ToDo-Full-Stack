import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { UserProvider } from './UserContext.jsx'
import SignIn from './SignIn'

describe('Username Input Value', () => {
  it('Input field is changin state', () => {
    const { queryByPlaceholderText } = render(<UserProvider><SignIn /></UserProvider>)
    const usernameInput = queryByPlaceholderText('Username')
    fireEvent.change(usernameInput, { target: { value: 'Hey' } })
    expect(usernameInput.value).toBe('Hey')
  })
})

describe('Password Input Value', () => {
  it('Input field is changin state', () => {
    const { queryByPlaceholderText } = render(<UserProvider><SignIn /></UserProvider>)
    const passwordInput = queryByPlaceholderText('Password')
    fireEvent.change(passwordInput, { target: { value: 'testing' } })
    expect(passwordInput.value).toBe('testing')
  })
})

// Don: this test needs much more work
describe('Submit button', () => {
  // remove the next line after the test is sorted
  // eslint-disable-next-line jest/expect-expect
  it('triggers submit function', () => {
    const { queryByTestId } = render(<UserProvider><SignIn /></UserProvider>)
    fireEvent.click(queryByTestId('submit-button'))
  })
})
