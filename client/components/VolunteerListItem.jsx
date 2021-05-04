import React, { useState } from 'react'
import { toggleIsAttended } from '../pages/eventHelper'

function VolunteerListItem (props) {
  const [isChecked, setIsChecked] = useState(props.attended)

  function handleChange (e) {
    const data = {
      isAttended: e.target.checked,
      userId: props.userId,
      eventId: props.eventId
    }
    setIsChecked(data.isAttended)
    toggleIsAttended(data)
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange} />
      {props.firstName} {props.lastName}
    </li>
  )
}

export default VolunteerListItem
