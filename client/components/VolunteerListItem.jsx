import React, { useState } from 'react'

function VolunteerListItem (props) {
  const [isChecked, setIsChecked] = useState('')
  return (
    <li>
    <input 
    type="checkbox"
    checked={isChecked}
    onChange={() => setIsChecked(!isChecked)} />
    {props.firstName} {props.lastName}
    </li>
  )
}

export default VolunteerListItem
