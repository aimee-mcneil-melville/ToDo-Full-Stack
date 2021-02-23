import React from 'react'
import { screen, fireEvent } from '@testing-library/react'

import { renderWithRouter } from '../test-utils'

import EventItem from './EventItem'
import { getIfVolunteer, toggleVolunteerButton } from './EventItemHelper'

jest.mock('./eventItemHelper')

describe('Edit Event button', () => {
  it('displays for admin', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}}/>)
    expect(screen.getByRole('link')).toHaveTextContent('Edit Event')
  })

  it('does not display if not an admin', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{}}/>)
    expect(screen.queryByRole('link')).toBeNull()
  })
})

describe('Volunteer button', () => {
  it('displays Volunteer for member if not volunteered for event', () => {
    getIfVolunteer.mockImplementation(() => false)

    renderWithRouter(<EventItem isAdmin={false} event={{}} />)
    const button = screen.queryByRole('button')
    expect(getIfVolunteer).toHaveBeenCalled()
    expect(button.textContent).toBe('Volunteer')
  })

  it('does not display if not a member', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}}/>)
    expect(screen.queryByRole('button')).toBeNull()
  })
})

describe('Un-Volunteer button', () => {
  it('displays Un-Volunteer for member if already volunteered for event', () => {
    getIfVolunteer.mockImplementation(() => true)

    renderWithRouter(<EventItem isAdmin={false} event={{}} />)
    const button = screen.queryByRole('button')
    expect(getIfVolunteer).toHaveBeenCalled()
    expect(button.textContent).toBe('Un-Volunteer')
  })
})

describe('toggle volunteer button', () => {
  it('clicking volunteer button calls toggleVolunteerButton', () => {
    getIfVolunteer.mockImplementation(() => false)
    renderWithRouter(<EventItem isAdmin={false} event={{}}/>)
    fireEvent.click(screen.queryByRole('button'))
    expect(toggleVolunteerButton).toHaveBeenCalled()
  })
})
