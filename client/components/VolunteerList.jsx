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
                volunteer={volunteer}
                eventId={props.eventId}
              />
            )
          })
        }
      </ul>
    </>
  )
}

export default VolunteerList
