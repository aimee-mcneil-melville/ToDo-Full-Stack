import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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
const match = { params: { id: 23 } }

describe('form field values', () => {
  it('contains event data from helper', () => {
    render(<EditEvent match={match} />)

    return screen.findByRole('textbox', { name: 'Event Title' })
      .then((titleInput) => {
        expect(titleInput).toHaveValue('title to edit')
        return null
      })
  })
})

describe('submit button', () => {
  it('has text from action prop', () => {
    render(<EditEvent match={match} />)
    return screen.findByRole('button')
      .then((editButton) => {
        expect(editButton).toHaveTextContent('Update Event')
        return null
      })
  })

  it('calls helper correctly on click', () => {
    const fakeHistory = {
      push: () => {}
    }

    updateEvent.mockImplementation((id, event, navigateTo) => {
      expect(id).toBe(23)
      expect(navigateTo).toBe(fakeHistory.push)
      expect(event.title).toBe('test title')
    })

    render(<EditEvent match={match} history={fakeHistory} />)

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
    render(<EditEvent match={match} />)
    const inputs = screen.queryByRole('textbox')
    expect(inputs).toBeNull()
    return screen.findByRole('textbox', { name: 'Event Title' })
      .then((titleInput) => {
        expect(titleInput).toBeInTheDocument()
        return null
      })
  })
})
