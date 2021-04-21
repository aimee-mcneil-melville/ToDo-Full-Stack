import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '../../test-utils'

import SignIn from './SignIn'
import { signInUser } from './signInHelper'

jest.mock('./signInHelper')

describe('form fields', () => {
  it('update correctly on user input', () => {
    render(<SignIn />)
    const usernameInput = screen.getByLabelText('Username')
    // need getByLabelText for password as type="hidden" hides it for getByRole
    const passwordInput = screen.getByLabelText('Password')

    userEvent.type(usernameInput, 'Hey')
    userEvent.type(passwordInput, 'testing')

    expect(usernameInput).toHaveValue('Hey')
    expect(passwordInput).toHaveValue('testing')
  })
})

describe('Sign In button', () => {
  it('calls signInUser helper on click', () => {
    renderWithRouter(<SignIn />)

    const signInButton = screen.getByRole('button', { name: 'Sign in' })
    userEvent.click(signInButton)

    expect(signInUser).toHaveBeenCalled()
  })
})
