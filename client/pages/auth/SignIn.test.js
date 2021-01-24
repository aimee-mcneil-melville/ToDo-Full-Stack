import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import SignIn from './SignIn'
import { signInUser } from './signInHelper'

jest.mock('./signInHelper')

describe('form fields', () => {
  it('update correctly on user input', () => {
    render(<SignIn />)
    const usernameInput = screen.getByLabelText('Username')
    // need getByLabelText for password as type="hidden" hides it for getByRole
    const passwordInput = screen.getByLabelText('Password')

    fireEvent.change(usernameInput, { target: { value: 'Hey' } })
    fireEvent.change(passwordInput, { target: { value: 'testing' } })

    expect(usernameInput.value).toBe('Hey')
    expect(passwordInput.value).toBe('testing')
  })
})

describe('Sign In button', () => {
  it('calls signInUser helper on click', () => {
    render(<SignIn history={[]} />)

    const signInButton = screen.getByRole('button', { name: 'Sign in' })
    fireEvent.click(signInButton)

    expect(signInUser).toHaveBeenCalled()
  })
})
