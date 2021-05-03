import React from 'react'

function volunteersList(props) {
return (
  <>
  <h4>List of Volunteers</h4>
  <ul>{props.volunteers.map(volunteer => {
    return (
    <li key={volunteer}>
      {volunteer.name}
    </li>
)})}
  </ul>
  </>
)
}


export default volunteersList