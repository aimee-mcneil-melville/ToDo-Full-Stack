import React, { useState } from 'react'
import { toggleVolunteerStatus } from '../pages/eventHelper'

function VolunteerListItem ({ volunteer, eventId }) {
  const { firstName, lastName, attended } = volunteer
  const [isChecked, setIsChecked] = useState(attended)

  function handleChange (e) {
    const isVolunteering = e.target.checked
    setIsChecked(isVolunteering)
    toggleVolunteerStatus(eventId, isVolunteering)
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange} />
      {firstName} {lastName}
    </li>
  )
}

export default VolunteerListItem
