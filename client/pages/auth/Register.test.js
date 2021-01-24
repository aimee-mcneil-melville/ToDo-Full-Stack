import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Register from './Register.jsx'
import { registerUser } from './registerHelper'

jest.mock('./registerHelper')

describe('form fields', () => {
  it('update correctly on user input', () => {
    render(<Register />)
    const usernameInput = screen.getByLabelText('Username')
    // need getByLabelText for password as type="hidden" hides it for getByRole
    const passwordInput = screen.getByLabelText('Password')
    const gardenInput = screen.getByLabelText('My Garden')

    fireEvent.change(usernameInput, { target: { value: 'test username' } })
    fireEvent.change(passwordInput, { target: { value: 'test password' } })
    fireEvent.change(gardenInput, { target: { value: 2 } })

    expect(usernameInput.value).toBe('test username')
    expect(passwordInput.value).toBe('test password')
    expect(gardenInput.value).toBe('2')
  })
})

describe('Register button', () => {
  it('calls registerUser helper on click', () => {
    render(<Register history={[]} />)

    const registerButton = screen.getByRole('button', { name: 'Register' })
    fireEvent.click(registerButton)

    expect(registerUser).toHaveBeenCalled()
  })
})
