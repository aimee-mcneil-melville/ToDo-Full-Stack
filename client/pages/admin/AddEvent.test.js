import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddEvent from './AddEvent'
import { addEvent } from './addEventHelper'

jest.mock('./addEventHelper')

describe('form', () => {
  it('is empty', () => {
    render(<AddEvent />)
    const titleInput = screen.getByRole('textbox', { name: 'Event Title' })
    expect(titleInput).toHaveValue('')
  })
})

describe('submit button', () => {
  it('has "Create Event" name from props', () => {
    render(<AddEvent />)
    const addButton = screen.getByRole('button')
    expect(addButton).toHaveTextContent('Create Event')
  })

  it('calls addEvent helper with event data on click', () => {
    const fakeHistory = {
      push: () => {}
    }

    addEvent.mockImplementation((event, navigateTo) => {
      expect(navigateTo).toBe(fakeHistory.push)
      expect(event.title).toBe('test title')
    })

    render(<AddEvent history={fakeHistory} />)

    const titleInput = screen.getByRole('textbox', { name: 'Event Title' })
    const addButton = screen.getByRole('button')

    userEvent.type(titleInput, 'test title')
    userEvent.click(addButton)

    expect(addEvent).toHaveBeenCalled()
  })
})
