import React, { useState } from 'react'
import { toggleAttendance } from './volunteerListItemHelper'

export default function VolunteerListItem({ volunteer, eventId }) {
  const { userId, firstName, lastName, attended } = volunteer
  const [isChecked, setIsChecked] = useState(attended)

  function handleChange(e) {
    const hasAttended = e.target.checked
    setIsChecked(hasAttended)
    toggleAttendance({ eventId, userId, hasAttended })
  }

  return (
    <li>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      {firstName} {lastName}
    </li>
  )
}
