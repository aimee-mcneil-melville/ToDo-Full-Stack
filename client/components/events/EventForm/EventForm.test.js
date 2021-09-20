import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EventForm from './EventForm'

describe('event form field', () => {
  it('updates correctly on user input', () => {
    render(<EventForm />)
    const titleInput = screen.getByRole('textbox', { name: 'Event Title' })
    const descriptionInput = screen.getByRole('textbox', { name: 'Description' })

    userEvent.type(titleInput, 'test title')
    userEvent.type(descriptionInput, 'cool event, yeiyah!')
    expect(titleInput).toHaveValue('test title')
    expect(descriptionInput).toHaveTextContent(/yeiyah/)
  })
})

describe('event preview', () => {
  it('displays inputted data correctly', () => {
    render(<EventForm
      formData={{
        title: 'test title',
        date: '2021-03-02',
        volunteersNeeded: 1,
        description: 'truly radical event'
      }}
    />)

    const titlePreview = screen.getByText(/test title/)
    const volunteersPreview = screen.getByText(/volunteer/i)
    expect(titlePreview).toHaveTextContent('test title')
    expect(volunteersPreview).toHaveTextContent('1 volunteer needed')

    const titleInput = screen.getByRole('textbox', { name: 'Event Title' })
    userEvent.clear(titleInput)
    userEvent.type(titleInput, 'new title')

    expect(titlePreview).toHaveTextContent('new title')
  })

  it('displays default values when form fields are empty', () => {
    render(<EventForm />)
    const titlePreview = screen.getByText('Title')
    const volunteersPreview = screen.getByText(/volunteer/i)
    expect(titlePreview).toHaveTextContent('Your title here')
    expect(volunteersPreview).toHaveTextContent('0 volunteers needed')
  })
})
