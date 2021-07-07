import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import VolunteerButton from './VolunteerButton'
import { toggleVolunteerStatus } from './volunteerButtonHelper'

jest.mock('./volunteerButtonHelper')

describe('VolunteerButton', () => {
  it('has text "Volunteer" when volunteering is false', () => {
    render(<VolunteerButton volunteering={false} />)
    const volunteerButton = screen.getByRole('button')
    expect(volunteerButton).toHaveTextContent('Volunteer')
  })

  it('has text "Un-Volunteer" when volunteering is true', () => {
    render(<VolunteerButton volunteering={true} />)
    const volunteerButton = screen.getByRole('button')
    expect(volunteerButton).toHaveTextContent('Un-Volunteer')
  })

  it('calls toggleVolunteerStatus and toggles on click', () => {
    render(<VolunteerButton />)

    const volunteerButton = screen.getByRole('button')

    userEvent.click(volunteerButton)
    expect(toggleVolunteerStatus).toHaveBeenCalled()
  })
})
