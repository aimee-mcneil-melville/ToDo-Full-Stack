import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '../../test-utils'

import EditEvent from './EditEvent'

import { getEvent, updateEvent } from './editEventHelper'

jest.mock('./editEventHelper')

// defined here as used in the mounting useEffect of every render
getEvent.mockImplementation(() => Promise.resolve({
  title: 'title to edit',
  date: '2021-03-02',
  volunteersNeeded: 4,
  description: 'truly radical event'
})
)
describe('form field values', () => {
  it('contains event data from helper', () => {
    renderWithRouter(<EditEvent />, { initialEntries: ['/events/23/edit'], route: '/events/:id/edit' })

    return screen.findByRole('textbox', { name: 'Event Title' })
      .then((titleInput) => {
        expect(titleInput).toHaveValue('title to edit')
        return null
      })
  })
})

describe('submit button', () => {
  it('has text from action prop', () => {
    renderWithRouter(<EditEvent />, { initialEntries: ['/events/23/edit'], route: '/events/:id/edit' })
    return screen.findByRole('button')
      .then((editButton) => {
        expect(editButton).toHaveTextContent('Update Event')
        return null
      })
  })

  it('calls helper correctly on click', () => {
    updateEvent.mockImplementation((id, event, navigateTo) => {
      expect(id).toBe('23')
      expect(event.title).toBe('test title')
      expect(typeof navigateTo).toBe('function')
    })

    renderWithRouter(<EditEvent />, { initialEntries: ['/events/23/edit'], route: '/events/:id/edit' })

    return screen.findByRole('textbox', { name: 'Event Title' })
      .then((titleInput) => {
        const editButton = screen.getByRole('button')
        userEvent.clear(titleInput)
        userEvent.type(titleInput, 'test title')
        userEvent.click(editButton)

        expect(updateEvent).toHaveBeenCalled()
        return null
      })
  })
})

describe('event form', () => {
  it('is rendered only when event data is available', () => {
    renderWithRouter(<EditEvent />, { initialEntries: ['/events/23/edit'], route: '/events/:id/edit' })
    const inputs = screen.queryByRole('textbox')
    expect(inputs).toBeNull()
    return screen.findByRole('textbox', { name: 'Event Title' })
      .then((titleInput) => {
        expect(titleInput).toBeInTheDocument()
        return null
      })
  })
})
