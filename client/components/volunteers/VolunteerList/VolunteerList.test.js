import React from 'react'
import { render, screen } from '@testing-library/react'

import VolunteerList from './VolunteerList'

describe('Volunteers list', () => {
  it('displays correct number of volunteers from props', () => {
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
    render(<VolunteerList volunteers={mockVolunteers} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.queryByText('No volunteers yet')).toBeNull()
  })

  it('displays "No volunteers yet" if no volunteers provided', () => {
    render(<VolunteerList />)
    expect(screen.queryByRole('listitem')).toBeNull()
    expect(screen.getByText('No volunteers yet')).toBeInTheDocument()
  })
})
