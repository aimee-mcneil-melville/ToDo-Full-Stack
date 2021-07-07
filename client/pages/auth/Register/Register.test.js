import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '../../../test-utils'

import Register from './Register.jsx'
import { registerUser } from './registerHelper'

jest.mock('./registerHelper')

describe('form fields', () => {
  it('update correctly on user input', () => {
    render(<Register />)
    const firstNameInput = screen.getByRole('textbox', { name: 'First Name' })
    const lastNameInput = screen.getByRole('textbox', { name: 'Last Name' })
    const usernameInput = screen.getByRole('textbox', { name: 'Username' })
    // need getByLabelText for password as type="hidden" hides it for getByRole
    const passwordInput = screen.getByLabelText('Password')
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    const gardenInput = screen.getByRole('combobox', { name: 'My Garden' })

    userEvent.type(firstNameInput, 'test first name')
    userEvent.type(lastNameInput, 'test last name')
    userEvent.type(usernameInput, 'test username')
    userEvent.type(passwordInput, 'test password')
    userEvent.type(emailInput, 'test@email.com')
    userEvent.selectOptions(gardenInput, '2')

    expect(firstNameInput).toHaveValue('test first name')
    expect(lastNameInput).toHaveValue('test last name')
    expect(usernameInput).toHaveValue('test username')
    expect(passwordInput).toHaveValue('test password')
    expect(emailInput).toHaveValue('test@email.com')
    expect(gardenInput).toHaveValue('2')
  })
})

describe('Register button', () => {
  it('calls registerUser helper on click', () => {
    renderWithRouter(<Register />)

    const registerButton = screen.getByRole('button', { name: 'Register' })
    userEvent.click(registerButton)

    expect(registerUser).toHaveBeenCalled()
  })
})
