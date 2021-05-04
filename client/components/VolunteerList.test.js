import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../test-utils'

import VolunteerList from './VolunteersList'

describe('volunteers list', () => {
  it('displays the volunteers who have signed up', () => {
    const mockData = [
      {
        id: 1,
        firstName: 'Test User',
        lastName: 'Lastname'
      },
      {
        id: 2,
        firstName: 'Test User 2',
        lastName: 'Lastname 2'
      }
    ]
    renderWithRedux(<VolunteerList key={1} volunteers={mockData} />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })
})
