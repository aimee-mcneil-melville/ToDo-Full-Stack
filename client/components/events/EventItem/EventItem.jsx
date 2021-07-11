import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import VolunteerButton from '../../volunteers/VolunteerButton/VolunteerButton'

export default function EventItem ({ event, isAdmin }) {
  const { id, title, date, volunteersNeeded, totalVolunteers, isVolunteer } = event
  const [isVolunteering, setIsVolunteering] = useState(isVolunteer)
  const remainingVolunteers = volunteersNeeded - totalVolunteers
  const additionalVolunteers = Math.abs(remainingVolunteers)

  useEffect(() => {
    setIsVolunteering(isVolunteer)
  }, [isVolunteer])

  return (
    <article className='item-container'>
      <h2 className='event-title'>
        <Link to={`/events/${id}`}>{title}</Link>
      </h2>
      <p>{date}</p>
      {remainingVolunteers > 0
        ? <p className='empty-space'>{remainingVolunteers} of {volunteersNeeded} volunteers still needed</p>
        : <p className='empty-space'>No more volunteers needed, but we can always use more hands! (Currently {additionalVolunteers} extra volunteer{additionalVolunteers !== 1 ? 's' : ''})</p>
      }
      {isAdmin
        ? <Link to={`/events/${id}/edit`} className='view-event-link'>View Event</Link> // need another link for event admin
        : <VolunteerButton
          eventId={id}
          volunteering={isVolunteering}
          setVolunteering={setIsVolunteering}
        />
      }
      <p className='link-placeholder'>Event Admin</p>
    </article>
  )
}
