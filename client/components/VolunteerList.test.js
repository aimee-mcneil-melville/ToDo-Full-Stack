import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../test-utils'

import VolunteerList from './VolunteerList'

describe('Volunteers list', () => {
  it('displays the volunteers who have signed up', () => {
    const mockData = [
      {
        userId: 1,
        firstName: 'Test User',
        lastName: 'Lastname',
        attended: true
      },
      {
        userId: 2,
        firstName: 'Test User 2',
        lastName: 'Lastname 2',
        attended: false
      }
    ]
    renderWithRedux(<VolunteerList volunteers={mockData} />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })
})
