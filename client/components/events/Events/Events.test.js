import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../../../test-utils'

import Events from './Events'

describe('Add Event button', () => {
  it('displays for admin', () => {
    renderWithRedux(<Events events={[]} />, {
      initialState: { user: { isAdmin: true } },
    })
    expect(screen.getByRole('link')).toHaveTextContent('Add New Event')
  })

  it('does not display if not an admin', () => {
    renderWithRedux(<Events events={[]} />)
    expect(screen.queryByRole('link')).toBeNull()
  })
})

describe('events list', () => {
  it('displays correct number of events from props', () => {
    const events = [
      {
        id: 1,
        volunteersNeeded: 8,
        title: 'Weeding worker Bee',
        date: '2020-08-27',
        description: 'Its time to get these weeds under control.',
      },
      {
        id: 2,
        volunteersNeeded: 4,
        title: 'Sowing Corn',
        date: '2020-08-28',
        description: 'Help get out the lovely corns in the ground!.',
      },
    ]
    renderWithRedux(<Events events={events} />)
    const eventItems = screen.getAllByRole('heading', { level: 2 })
    expect(eventItems).toHaveLength(2)
  })
})
