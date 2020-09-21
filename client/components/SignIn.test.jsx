import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SignIn from './SignIn'

describe('Input Value', () => {
  it('Input field is changin state', () => {
    const { queryByPlaceholderText } = render(<SignIn />)
    const usernameInput = queryByPlaceholderText('Username')
    fireEvent.change(usernameInput, { target: { value: 'Hey' } })
    expect(usernameInput.value).toBe('Hey')
  })
})

describe('Input Value', () => {
  it('Input field is changin state', () => {
    const { queryByPlaceholderText } = render(<SignIn />)
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
    const { queryByTestId } = render(<SignIn />)
    fireEvent.click(queryByTestId('submit-button'))
  })
})
