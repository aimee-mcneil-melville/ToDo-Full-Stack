import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../../test-utils'

import Event from './Event'
import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import { getEvent } from '../../pages/Event/eventHelper'

jest.mock('./eventHelper')

describe('List of signed up volunteers', () => {
  const mockVolunteers = [
    {
      userId: 1,
      firstName: 'Test User',
      lastName: 'Lastname',
      attended: true,
    },
    {
      userId: 2,
      firstName: 'Test User 2',
      lastName: 'Lastname 2',
      attended: false,
    },
  ]

  it('displays only for admin', () => {
    renderWithRedux(<VolunteerList volunteers={mockVolunteers} />, {
      initialState: { user: { isAdmin: true } },
    })
    return screen.findAllByRole('listitem').then((volunteers) => {
      expect(volunteers[1]).toHaveTextContent('Test User 2')
      return null
    })
  })

  it('does not display if not an admin', () => {
    getEvent.mockImplementation(() =>
      Promise.resolve({
        gardenId: 1,
        title: 'title to edit',
        date: '24/09/2001',
        volunteersNeeded: 4,
        description: 'truly radical event',
      })
    )
    renderWithRedux(<Event />, {
      initialState: { user: { isAdmin: false } },
      initialEntries: ['/events/23/edit'],
      route: '/events/:id/edit',
    })

    const error = screen.queryByRole('heading', { name: 'List of Volunteers' })
    expect(error).toBeNull()
  })
})
