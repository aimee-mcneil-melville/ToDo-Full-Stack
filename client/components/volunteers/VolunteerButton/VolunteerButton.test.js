import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
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
    toggleVolunteerStatus.mockImplementation(() => {
      return Promise.resolve(true)
    })

    const setVolunteering = jest.fn()

    render(<VolunteerButton
      eventId={23}
      volunteering={false}
      setVolunteering={setVolunteering}
    />)

    const volunteerButton = screen.getByRole('button')

    userEvent.click(volunteerButton)
    return waitFor(() => expect(setVolunteering).toHaveBeenCalled())
      .then(() => {
        expect(setVolunteering).toHaveBeenCalledWith(true)
        return null
      })
  })

  it('does not toggle if toggleVolunteerStatus unsuccessful', () => {
    toggleVolunteerStatus.mockImplementation(() => {
      return Promise.resolve(false)
    })

    const setVolunteering = jest.fn()

    render(<VolunteerButton
      eventId={23}
      volunteering={false}
      setVolunteering={setVolunteering}
    />)

    const volunteerButton = screen.getByRole('button')
    userEvent.click(volunteerButton)

    setTimeout(() => {
      expect(toggleVolunteerStatus).toHaveBeenCalled()
      expect(setVolunteering).not.toHaveBeenCalled()
      return null
    }, 500)
  })
})
