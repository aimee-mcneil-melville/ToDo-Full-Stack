import React from 'react'
import RockUpVolunteerListItem from '../RockUpVolunteerListItem/RockUpVolunteerListItem'

export default function RockUpVolunteerList({ extraVolunteers }) {
  return (
    <>
      <h4>Rock-ups</h4>
      <ul>
        {extraVolunteers?.map((volunteer) => {
          return (
            <RockUpVolunteerListItem
              key={volunteer.extraVolId}
              volunteer={volunteer}
            />
          )
        })}
      </ul>
    </>
  )
}
