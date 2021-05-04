import React from 'react'
import VolunteerListItem from './VolunteerListItem'

function VolunteerList (props) {
  const volunteers = props.volunteers || []
  return (
    <>
      <h4>List of Volunteers</h4>
      <ul>
        {
          volunteers.map(volunteer => {
            return (
              <VolunteerListItem
                key={volunteer.userId}
                attended={volunteer.attended}
                userId={volunteer.userId}
                eventId={props.eventId}
                firstName={volunteer.firstName}
                lastName={volunteer.lastName}
              />
            )
          })
        }
      </ul>
    </>
  )
}

export default VolunteerList
