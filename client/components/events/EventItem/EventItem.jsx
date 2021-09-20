import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import VolunteerButton from '../../volunteers/VolunteerButton/VolunteerButton'

export default function EventItem ({ event, isAdmin }) {
  const { id, title, date, volunteersNeeded, totalVolunteers, isVolunteer, status } = event
  const [isVolunteering, setIsVolunteering] = useState(isVolunteer)
  const remainingVolunteers = volunteersNeeded - totalVolunteers
  const additionalVolunteers = Math.abs(remainingVolunteers)

  useEffect(() => {
    setIsVolunteering(isVolunteer)
  }, [isVolunteer])

  return (
    <article className='card-primary'>
      <h2 className='card-title'><Link to={`/events/${id}`}>{title}</Link></h2>
      <ul className='list-primary'>
        <li>{date}</li>
        {remainingVolunteers > 0
          ? <li>{remainingVolunteers} of {volunteersNeeded} volunteers still needed</li>
          : <li>No more volunteers needed, but we can always use more hands! (Currently {additionalVolunteers} extra volunteer{additionalVolunteers !== 1 ? 's' : ''})</li>
        }
        <li>{status}</li>
      </ul>
      {isAdmin
        ? <Link to={`/events/${id}/edit`}>Edit Event</Link>
        : <VolunteerButton
          eventId={id}
          volunteering={isVolunteering}
          setVolunteering={setIsVolunteering}
        />
      }
      {/* Does below need to go here */}
      {/* <Link to={`/events/${id}`}>View Event</Link> */}
    </article>
  )
}
