import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../../test-utils'

import Event from './Event'
import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import { getEvent } from './eventHelper'

jest.mock('./eventHelper')

const mockData = {
  title: 'Mock title',
  date: '2021-03-02',
  gardenName: 'Mock garden',
  volunteersNeeded: 4,
  description: 'this is our mock data description truly radical event',
  lat: -36.8666700,
  lon: 174.7666700
}

describe('Event details page', () => {
  it('renders event data', () => {
    expect.assertions(2)
    getEvent.mockImplementation(() => Promise.resolve(mockData))

    renderWithRedux(<Event />)

    return screen.findByText('Mock title').then(() => {
      const gardenNameElement = screen.getByText('Mock garden')
      const dateAndVolunteerNeeded = screen.getByText('2021-03-02')

      expect(gardenNameElement).toBeInTheDocument()
      expect(dateAndVolunteerNeeded).toBeInTheDocument()
      return null
    })
  })

  // it('checks logic in ternary operator for map lat&lon', () => {
  //   getEvent.mockImplementation(() => Promise.resolve(mockData))

  //   renderWithRedux(<Event />)

  //   const markers = screen.queryByRole('img')

  //   expect(markers).toBeNull()
  //   return screen.findByText('Mock title').then(() => {
  //     expect(markers).toBe(2) // currently returns null
  //     return null
  //   })
  // })

  describe('Volunteer button', () => {
    it('does not render if admin', () => {
      getEvent.mockImplementation(() => Promise.resolve(mockData))

      renderWithRedux(<Event />, {
        initialState: {
          user: {
            isAdmin: true
          }
        }
      })
      return screen.findByText('Mock title').then(() => {
        const volunteerButton = screen.queryByRole('button')
        expect(volunteerButton).toBeNull()
        return null
      })
    })

    it('renders if not admin', () => {
      getEvent.mockImplementation(() => Promise.resolve(mockData))
      renderWithRedux(<Event />, {
        initialState: {
          user: {
            isAdmin: false
          }
        }
      })

      return screen.findByText('Mock title').then(() => {
        const volunteerButton = screen.getByRole('button', { name: 'Volunteer' })
        expect(volunteerButton).toHaveTextContent('Volunteer')
        return null
      })
    })
  })
})

describe('List of signed up volunteers', () => {
  const mockVolunteers = [
    {
      userId: 1,
      firstName: 'Test User',
      lastName: 'Lastname',
      attended: true
    }, {
      userId: 2,
      firstName: 'Test User 2',
      lastName: 'Lastname 2',
      attended: false
    }
  ]

  it('displays only for admin', () => {
    renderWithRedux(<VolunteerList volunteers={mockVolunteers} />, {
      initialState: { user: { isAdmin: true } }
    })
    return screen.findAllByRole('listitem')
      .then(volunteers => {
        expect(volunteers[1]).toHaveTextContent('Test User 2')
        return null
      })
  })

  it('does not display if not an admin', () => {
    renderWithRedux(<Event />, {
      initialState: { user: { isAdmin: false } }
    })
    return screen.findByText('Mock title')
      .then(() => {
        expect(screen.queryByRole('list')).toBeNull()
        return null
      })
  })
})
