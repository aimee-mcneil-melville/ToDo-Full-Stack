import React from 'react'
import { fireEvent } from '@testing-library/react'

import SignIn from './SignIn'
import { renderWithRedux } from '../test-utils'

describe('Username Input Value', () => {
  it('Input field is changin state', () => {
    const { queryByPlaceholderText } = renderWithRedux(<SignIn />)
    const usernameInput = queryByPlaceholderText('Username')
    fireEvent.change(usernameInput, { target: { value: 'Hey' } })
    expect(usernameInput.value).toBe('Hey')
  })
})

describe('Password Input Value', () => {
  it('Input field is changin state', () => {
    const { queryByPlaceholderText } = renderWithRedux(<SignIn />)
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
    const { queryByTestId } = renderWithRedux(<SignIn />)
    fireEvent.click(queryByTestId('submit-button'))
  })
})
