import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import VolunteerListItem from './VolunteerListItem'
import { toggleAttendance } from './volunteerListItemHelper'

jest.mock('./volunteerListItemHelper')

describe('VolunteerListItem', () => {
  it('calls toggleAttendance and toggles on click', () => {
    const volunteer = {
      userId: 1,
      firstName: 'Keisuke',
      lastName: 'Tanaka',
      attended: false,
    }

    render(<VolunteerListItem volunteer={volunteer} eventId={5} />)

    const volunteerListItem = screen.getByRole('checkbox')

    userEvent.click(volunteerListItem)
    expect(toggleAttendance).toHaveBeenCalledWith({
      eventId: 5,
      userId: 1,
      hasAttended: true,
    })
  })
})
