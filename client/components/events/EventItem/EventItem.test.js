import React from 'react'
import { screen, fireEvent } from '@testing-library/react'

import { renderWithRouter } from '../../../test-utils'

import EventItem from './EventItem'
import { toggleVolunteerStatus } from '../../../pages/Event/eventHelper'

jest.mock('../../../pages/Event/eventHelper')

toggleVolunteerStatus.mockImplementation(() => Promise.resolve(true))

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
  it('displays Volunteer for member if not volunteered for event', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{ isVolunteer: false }} />)
    const button = screen.queryByRole('button')
    expect(button.textContent).toBe('Volunteer')
  })

  it('does not display if not a member', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}}/>)
    expect(screen.queryByRole('button')).toBeNull()
  })
})

describe('Un-Volunteer button', () => {
  it('displays Un-Volunteer for member if already volunteered for event', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{ isVolunteer: true }} />)
    const button = screen.queryByRole('button')
    expect(button.textContent).toBe('Un-Volunteer')
  })
})

describe('toggle volunteer button', () => {
  it('clicking volunteer button calls toggleVolunteerStatus', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{ isVolunteer: false }}/>)
    fireEvent.click(screen.queryByRole('button'))
    return screen.findByRole('button', { name: 'Un-Volunteer' })
      .then(() => {
        expect(toggleVolunteerStatus).toHaveBeenCalled()
        return null
      })
  })
})
