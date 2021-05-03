import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRedux } from '../test-utils'
import Event from './Event'
import { getEvent, toggleVolunteerStatus } from './eventHelper'
import userEvent from '@testing-library/user-event'

jest.mock('./eventHelper')
const mockData = {
  title: 'Mock title',
  date: '2021-03-02',
  gardenName: 'Mock garden',
  volunteersNeeded: 4,
  description: 'this is our mock data description truly radical event'
}

getEvent.mockImplementation(() => Promise.resolve(mockData))

describe('Page Render', () => {
  it('Event component should render event data', () => {
    renderWithRedux(<Event />)
    expect.assertions(2)
    return screen.findByText('Mock title').then(() => {
      const gardenNameElement = screen.getByText('Mock garden')
      expect(gardenNameElement).toBeInTheDocument()

      const dateAndVolunteerNeeded = screen.getByText('2021-03-02')
      expect(dateAndVolunteerNeeded).toBeInTheDocument()

      return null
    })
  })
})

describe('Admin and non admin test', () => {
  it('Event component should not render volunteer the button if admin', () => {
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
  it('Event component should render the volunteer button if not admin', () => {
    renderWithRedux(<Event />, {
      initialState: {
        user: {
          isAdmin: false
        }
      }
    })

    return screen.findByText('Mock title').then(() => {
      const volunteerButton = screen.getByRole('button')
      expect(volunteerButton.innerHTML).toMatch('Volunteer')
      return null
    })
  })
})

describe('Not admin volunteer button test', () => {
  toggleVolunteerStatus.mockImplementation((id, isVolunteer) => {
    return Promise.resolve(true)
  })

  it('Should volunteer when click volunteer button', () => {
    renderWithRedux(<Event />, {
      initialState: {
        user: {
          isAdmin: false
        }
      }
    })

    return screen.findByText('Volunteer')
      .then(volunteerButton => {
        userEvent.click(volunteerButton)
        expect(toggleVolunteerStatus).toHaveBeenCalled()
        return screen.findByText('Un-Volunteer')
      }).then(unVolunteer => {
        expect(unVolunteer.innerHTML).toMatch('Un-Volunteer')
        return null
      })
  })
})
