import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRouter } from '../../../test-utils'

import EventItem from './EventItem'

describe('Edit Event button', () => {
  it('displays for admin', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}} />)
    const editEventButton = screen.getByRole('link', { name: 'Edit Event' })
    expect(editEventButton).toBeInTheDocument()
  })

  it('does not display if not an admin', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{}} />)
    const editEventButton = screen.queryByRole('link', { name: 'Edit Event' })
    expect(editEventButton).toBeNull()
  })
})

describe('Volunteer button', () => {
  it('displays for a member', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{ isVolunteer: false }} />)
    const volunteerButton = screen.getByRole('button', { name: 'Volunteer' })
    expect(volunteerButton).toHaveTextContent('Volunteer')
  })

  it('does not display for an admin', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{ isVolunteer: true }} />)
    const volunteerButton = screen.queryByRole('link', { name: 'Volunteer' })
    expect(volunteerButton).toBeNull()
  })
})

describe('Displays Event Status', () => {
  it('displays active for an active event', () => {
    renderWithRouter(<EventItem event={{ status: 'Active' }} />)
    const listItem = screen.getByText('Event is Active')
    expect(listItem).toBeVisible()
  })
  it('displays cancelled for a cancelled event', () => {
    renderWithRouter(<EventItem event={{ status: 'Cancelled' }} />)
    const listItem = screen.getByText('Event is Cancelled')
    expect(listItem).toBeVisible()
  })
})

describe('View event volunteers button', () => {
  it('displays for admin', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}} />)
    expect(screen.getByRole('link', { name: 'Volunteers' })).toBeInTheDocument()
  })

  it('does not display if not an admin', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{}} />)
    expect(screen.queryByRole('link', { name: 'Volunteers' })).toBeNull()
  })
})
