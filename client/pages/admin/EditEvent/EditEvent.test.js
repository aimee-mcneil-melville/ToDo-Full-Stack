import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRedux } from '../../../test-utils'

import EditEvent from './EditEvent'

import { getEvent } from '../../Event/eventHelper'
import { updateEvent } from './editEventHelper'

jest.mock('./editEventHelper')
jest.mock('../../Event/eventHelper')

// defined here as used in the mounting useEffect of every render
getEvent.mockImplementation(() =>
  Promise.resolve({
    gardenId: 1,
    title: 'title to edit',
    date: '24/09/2001',
    volunteersNeeded: 4,
    description: 'truly radical event',
  })
)

describe('form field values', () => {
  it('contains event data from helper', async () => {
    renderWithRedux(<EditEvent />, {
      initialState: {},
      initialEntries: ['/events/1/edit'],
      route: '/events/:id/edit',
    })

    const tt = await screen.findByRole('textbox', { name: 'Event Title' })
    expect(tt).toBeInTheDocument()
  })
})

describe('submit button', () => {
  it('calls helper correctly on click', async () => {
    updateEvent.mockImplementation((gardenId, event, navigateTo) => {
      expect(gardenId).toBe(1)
      expect(event.id).toBe('23')
      expect(event.title).toBe('test title')
      expect(typeof navigateTo).toBe('function')
    })

    renderWithRedux(<EditEvent />, {
      initialEntries: ['/events/23/edit'],
      route: '/events/:id/edit',
    })

    const titleInput = await screen.findByRole('textbox', {
      name: 'Event Title',
    })
    const editButton = screen.getByRole('button', { name: 'Submit' })
    userEvent.clear(titleInput)
    userEvent.type(titleInput, 'test title')
    userEvent.click(editButton) // form validation will kick in

    // wait for formik to its validation to be completed (asynchronise)
    const updatedTitle = await screen.findByRole('textbox', {
      name: 'Event Title',
    })
    expect(updatedTitle).toBeInTheDocument()
    expect(updateEvent).toHaveBeenCalled()
  })
})

describe('event form', () => {
  it('is rendered only when event data is available', () => {
    renderWithRedux(<EditEvent />, {
      initialEntries: ['/events/23/edit'],
      route: '/events/:id/edit',
    })
    const inputs = screen.queryByRole('textbox')
    expect(inputs).toBeNull()
    return screen
      .findByRole('textbox', { name: 'Event Title' })
      .then((titleInput) => {
        expect(titleInput).toBeInTheDocument()
        return null
      })
  })
})
