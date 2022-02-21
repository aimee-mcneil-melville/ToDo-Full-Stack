import React from 'react'

export default function RockUpVolunteerListItem({ volunteer }) {
  const { eventId, firstName, lastName } = volunteer
  return (
    <>
      <li key={eventId}>
        {firstName} {lastName}
      </li>
    </>
  )
}
