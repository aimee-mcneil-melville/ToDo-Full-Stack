import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Register from './Register.jsx'
import { UserProvider } from './UserContext.jsx'

describe('Register Renders', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<UserProvider><Register /></UserProvider>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Username Input Field Updates', () => {
  it('gets the text', () => {
    const { queryByPlaceholderText } = render(<UserProvider><Register /></UserProvider>)
    const usernameInput = queryByPlaceholderText('username')
    fireEvent.change(usernameInput, { target: { value: 'username' } })
    expect(usernameInput.value).toBe('username')
  })
})

describe('Password Input Field Updates', () => {
  it('gets the text', () => {
    const { queryByPlaceholderText } = render(<UserProvider><Register /></UserProvider>)
    const passwordInput = queryByPlaceholderText('username')
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    expect(passwordInput.value).toBe('password')
  })
})
// Don: This test isn't useful enough - let's chat
describe('Submit Button Finds Handleclick', () => {
  // remove the next line after fixing the test
  // eslint-disable-next-line jest/expect-expect
  it('sends the submit button', () => {
    const { queryByTestId } = render(<UserProvider><Register /></UserProvider>)
    fireEvent.click(queryByTestId('submitButton'))
  })
})
