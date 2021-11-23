import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Register from './Register'

describe('Register form field', () => {
  it('updates correctly on user input', async () => {
    render(<Register/>)

    const firstNameInput = screen.getByRole('textbox', { name: 'First Name' })
    const lastNameInput = screen.getByRole('textbox', { name: 'Last Name' })

    userEvent.type(firstNameInput, 'Mr Cool')
    userEvent.type(lastNameInput, 'Is Cool')

    await waitFor(() => {
      expect(firstNameInput).toHaveValue('Mr Cool')
      expect(lastNameInput).toHaveValue('Is Cool')
    })
  })
  it('"Required" comes up on empty input', async () => {
    const handleSubmit = jest.fn()
    render(<Register onSubmit={handleSubmit}/>)

    userEvent.clear(screen.getByLabelText(/first name/i))
    userEvent.clear(screen.getByLabelText(/last name/i))
    userEvent.clear(screen.getByLabelText(/username/i))

    userEvent.click(screen.getByRole('button', { name: /register/i }))

    const element = await screen.findAllByText('Required')
    expect(element[0]).toBeInTheDocument()
  })
  it('message comes up on short input', async () => {
    const handleSubmit = jest.fn()
    render(<Register onSubmit={handleSubmit}/>)

    userEvent.type(screen.getByLabelText(/first name/i), 'a')
    userEvent.type(screen.getByLabelText(/last name/i), 'b')
    userEvent.type(screen.getByLabelText(/username/i), 'c')

    userEvent.click(screen.getByRole('button', { name: /register/i }))

    const element = await screen.findAllByText('This must be at least 2 characters long')
    expect(element[0]).toBeInTheDocument()
  })
  it('message comes up on long input', async () => {
    const handleSubmit = jest.fn()
    render(<Register onSubmit={handleSubmit}/>)

    userEvent.type(screen.getByLabelText(/first name/i), 'whatawonderfuldaytobealive')
    userEvent.type(screen.getByLabelText(/last name/i), 'howmanydaysareleftoftheyear')
    userEvent.type(screen.getByLabelText(/username/i), 'thisisatestforalongusername')

    userEvent.click(screen.getByRole('button', { name: /register/i }))

    const element = await screen.findAllByText('Sorry, this must be under 15 characters long')
    expect(element[0]).toBeInTheDocument()
  })
})
