import React from 'react'
import { screen, fireEvent } from '@testing-library/react'

import { renderWithRouter } from '../../../test-utils'

import EventItem from './EventItem'

describe('Edit Event button', () => {
  it('displays for admin', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}}/>)
    expect(screen.getByRole('link', { name: 'Edit Event' })).toBeInTheDocument()
  })

  it('does not display if not an admin', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{}}/>)
    expect(screen.queryByRole('link', { name: 'Edit Event' })).toBeNull()
  })
})

describe('Volunteer button', () => {
  it('displays for a member', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{ isVolunteer: false }} />)
    const volunteerButton = screen.queryByRole('button')
    expect(volunteerButton).toHaveTextContent('Volunteer')
  })

  it('does not display for an admin', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}}/>)
    expect(screen.queryByRole('button')).toBeNull()
  })
})
