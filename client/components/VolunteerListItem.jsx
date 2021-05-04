import React from 'react'

function VolunteerListItem (props) {
  return (
    <li>
    <input type="checkbox" />
    {props.firstName} {props.lastName}
    </li>
  )
}

export default VolunteerListItem
