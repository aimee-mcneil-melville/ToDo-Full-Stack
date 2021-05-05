import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRedux } from '../test-utils'

import Event from './Event'
import VolunteerList from '../components/VolunteerList'
import { getEvent, toggleVolunteerStatus } from './eventHelper'

jest.mock('./eventHelper')

const mockData = {
  title: 'Mock title',
  date: '2021-03-02',
  gardenName: 'Mock garden',
  volunteersNeeded: 4,
  description: 'this is our mock data description truly radical event'
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

  it('calls toggleVolunteerStatus on click', () => {
    getEvent.mockImplementation(() => Promise.resolve(mockData))
    toggleVolunteerStatus.mockImplementation((id, isVolunteer) => {
      return Promise.resolve(true)
    })

    renderWithRedux(<Event />, {
      initialState: {
        user: {
          isAdmin: false
        }
      }
    })

    return screen.findByText('Mock title')
      .then(() => {
        const volunteerButton = screen.getByRole('button', { name: 'Volunteer' })
        expect(volunteerButton).toHaveTextContent('Volunteer')
        userEvent.click(volunteerButton)
        expect(toggleVolunteerStatus).toHaveBeenCalled()
        return screen.findByRole('button', { name: 'Un-Volunteer' })
      })
      .then(unvolunteerButton => {
        // expect(unvolunteerButton).toHaveTextContent('Un-Volunteer')
        expect(unvolunteerButton).toBeInTheDocument()
        return null
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
