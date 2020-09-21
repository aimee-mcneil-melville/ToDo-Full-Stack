import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, screen } from '@testing-library/react'

import Register from './Register'

describe('Register Renders', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Register />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Username Input Field Updates', () => {
  it('gets the text', () => {
    const { queryByPlaceholderText } = render(<Register />)
    const usernameInput = queryByPlaceholderText('username')
    fireEvent.change(usernameInput, { target: { value: 'username' } })
    expect(usernameInput.value).toBe('username')
  })
})

describe('Password Input Field Updates', () => {
  it('gets the text', () => {
    const { queryByPlaceholderText } = render(<Register />)
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
    const { queryByTestId } = render(<Register />)
    fireEvent.click(queryByTestId('submitButton'))
  })
})
