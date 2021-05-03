import React from 'react'

function VolunteerListItem (props) {
  return (
    <li>
    <button>✓</button>
    {props.firstName} {props.lastName}
    </li>
  )
}

export default VolunteerListItem