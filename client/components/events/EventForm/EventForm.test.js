import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EventForm from './EventForm'

describe('event form field', () => {
  it('updates correctly on user input', async () => {
    const emptyForm = {
      title: '',
      date: '',
      volunteersNeeded: 0,
      description: '',
    }
    render(<EventForm formData={emptyForm} />)

    const titleInput = screen.getByRole('textbox', { name: 'Event Title' })
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Description',
    })

    userEvent.type(titleInput, 'test title')
    userEvent.type(descriptionInput, 'cool event, yeiyah!')

    await waitFor(() => {
      expect(titleInput).toHaveValue('test title')
      expect(descriptionInput).toHaveTextContent(/yeiyah/)
    })
  })

  it('required comes up on invalid input', async () => {
    const handleSubmit = jest.fn()
    const mockForm = {
      title: 'mock title',
      date: '29/07/2020',
      volunteersNeeded: 2,
      description: 'rad event',
    }
    render(<EventForm onSubmit={handleSubmit} formData={mockForm} />)
    userEvent.clear(screen.getByLabelText(/event title/i))
    userEvent.clear(screen.getByLabelText(/date/i))
    userEvent.clear(screen.getByLabelText(/volunteers needed/i))
    userEvent.clear(screen.getByLabelText(/description/i))

    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    const ele = await screen.findAllByText('Required')
    expect(ele[0]).toBeInTheDocument()
  })
})
