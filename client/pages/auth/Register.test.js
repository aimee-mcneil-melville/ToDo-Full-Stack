import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Register from './Register.jsx'
import { registerUser } from './registerHelper'

jest.mock('./registerHelper')

describe('form fields', () => {
  it('update correctly on user input', () => {
    render(<Register />)
    const usernameInput = screen.getByLabelText('Username')
    // need getByLabelText for password as type="hidden" hides it for getByRole
    const passwordInput = screen.getByLabelText('Password')
    const emailInput = screen.getByLabelText('Email')
    const gardenInput = screen.getByLabelText('My Garden')

    userEvent.type(usernameInput, 'test username')
    userEvent.type(passwordInput, 'test password')
    userEvent.type(emailInput, 'test@email.com')
    userEvent.selectOptions(gardenInput, '2')

    expect(usernameInput).toHaveValue('test username')
    expect(passwordInput).toHaveValue('test password')
    expect(emailInput).toHaveValue('test@email.com')
    expect(gardenInput).toHaveValue('2')
  })
})

describe('Register button', () => {
  it('calls registerUser helper on click', () => {
    render(<Register history={[]} />)

    const registerButton = screen.getByRole('button', { name: 'Register' })
    userEvent.click(registerButton)

    expect(registerUser).toHaveBeenCalled()
  })
})
