import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../test-utils'

import Event from './Event'
import { getEvent } from './eventHelper'

jest.mock('./eventHelper')

getEvent.mockImplementation(() => Promise.resolve({
  title: 'title to edit',
  date: '2021-03-02',
  volunteersNeeded: 4,
  description: 'truly radical event'
})
)

describe('Page Render', () => {
  it('Component should render event data', () => {
    renderWithRedux(<Event />)
  })
})

//BUTTON TESTING
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