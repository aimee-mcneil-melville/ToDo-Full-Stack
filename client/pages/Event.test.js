import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRedux } from '../test-utils'
import Event from './Event'
import { getEvent, setVolunteerStatus } from './eventHelper'
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
  setVolunteerStatus.mockImplementation((id, isVolunteer) => {
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
        expect(setVolunteerStatus).toHaveBeenCalled()
        return screen.findByText('Un-Volunteer')
      }).then(unVolunteer => {
        expect(unVolunteer.innerHTML).toMatch('Un-Volunteer')
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
