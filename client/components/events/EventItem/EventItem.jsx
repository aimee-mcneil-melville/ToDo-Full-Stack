import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import VolunteerButton from '../../volunteers/VolunteerButton/VolunteerButton'

export default function EventItem ({ event, isAdmin }) {
  const { id, title, date, volunteersNeeded, description, totalVolunteers, isVolunteer } = event
  const [isVolunteering, setIsVolunteering] = useState(isVolunteer)
  const remainingVolunteers = volunteersNeeded - totalVolunteers
  const additionalVolunteers = Math.abs(remainingVolunteers)

  useEffect(() => {
    setIsVolunteering(isVolunteer)
  }, [isVolunteer])

  return (
    <article className='item-container'>
      <h2>
        <Link to={`/events/${id}`}>{title}</Link>
      </h2>
      <p>{date}</p>
      {remainingVolunteers > 0
        ? <p>{remainingVolunteers} of {volunteersNeeded} volunteers still needed</p>
        : <p>No more volunteers needed, but we can always use more hands! (Currently {additionalVolunteers} extra volunteer{additionalVolunteers !== 1 ? 's' : ''})</p>
      }
      <p>{description}</p>
      {isAdmin
        ? <Link to={`/events/${id}/edit`} className='edit-event-link'>Edit Event</Link>
        : <VolunteerButton
          eventId={id}
          volunteering={isVolunteering}
          setVolunteering={setIsVolunteering}
        />
      }
    </article>
  )
}
