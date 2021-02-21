import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRouter } from '../test-utils'

import EventItem from './EventItem'

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

describe('Volunteer/ Un-Volunteer button', () => {
  it('displays Volunteer for member if not volunteered for event', () => {
    renderWithRouter(<EventItem isAdmin={false} isVolunteer={false} event={{}} />)
    const button = screen.queryByRole('button')
    expect(button.textContent).toBe('Volunteer')
  })
  // it('displays Un-Volunteer for member if already volunteered for event', () => {
  //   renderWithRouter(<EventItem isAdmin={false} isVolunteer={true} event={{}} />)
  //   const button = screen.queryByRole('button')
  //   expect(button.textContent).toBe('Un-Volunteer')
  // })
  it('does not display if not a member', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}}/>)
    expect(screen.queryByRole('button')).toBeNull()
  })
})
