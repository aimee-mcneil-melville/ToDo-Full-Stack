import React, { useState } from 'react'
import { toggleVolunteerStatus } from '../pages/eventHelper'

function VolunteerListItem (props) {
  const { firstName, lastName, attended, eventId } = props
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
