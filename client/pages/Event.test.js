import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRedux } from '../test-utils'
import Event from './Event'
import { getEvent } from './eventHelper'

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
    expect.assertions(3)
    return screen.findByText('Mock title').then(() => {
      const gardenNameElement = screen.getByRole('heading', { level: 2 })
      expect(gardenNameElement.innerHTML).toMatch('Mock garden')

      const dateAndVolunteerNeeded = screen.getAllByRole('heading', { level: 3 })
      expect(dateAndVolunteerNeeded[0].innerHTML).toMatch(mockData.date)
      expect(Number(dateAndVolunteerNeeded[1].innerHTML)).toEqual(mockData.volunteersNeeded)

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
      return screen.findByRole('button').catch(err => {
        expect(err).not.toBeNull()
        expect(err.message).toMatch('Unable to find')
        return null
      })
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

// BUTTON TESTING
//     it('displays Volunteer for member if not volunteered for event', () => {
//       getIfVolunteer.mockImplementation(() => false)

//       renderWithRouter(<EventItem isAdmin={false} event={{}} />)
//       const button = screen.queryByRole('button')
//       expect(getIfVolunteer).toHaveBeenCalled()
//       expect(button.textContent).toBe('Volunteer')
//     })

//     it('does not display if not a member', () => {
//       renderWithRouter(<EventItem isAdmin={true} event={{}}/>)
//       expect(screen.queryByRole('button')).toBeNull()
//     })
//   })

//   describe('Un-Volunteer button', () => {
//     it('displays Un-Volunteer for member if already volunteered for event', () => {
//       getIfVolunteer.mockImplementation(() => true)

//       renderWithRouter(<EventItem isAdmin={false} event={{}} />)
//       const button = screen.queryByRole('button')
//       expect(getIfVolunteer).toHaveBeenCalled()
//       expect(button.textContent).toBe('Un-Volunteer')
//     })
