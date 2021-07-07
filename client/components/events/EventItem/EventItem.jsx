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
    <article className='box my-5'>
      <div className="is-flex">
        <h2 className='title is-5 is-flex-grow-1'>
          <Link className='title-link' to={`/events/${id}`}>{title}</Link>
        </h2>
        {isAdmin
          ? <Link to={`/events/${id}/edit`} className='button'>Edit Event</Link>
          : <VolunteerButton
            eventId={id}
            volunteering={isVolunteering}
            setVolunteering={setIsVolunteering}
          />
        }
      </div>
      <p>{date}</p>
      {remainingVolunteers > 0
        ? <p>{remainingVolunteers} of {volunteersNeeded} volunteers still needed</p>
        : <p>No more volunteers needed, but we can always use more hands! (Currently {additionalVolunteers} extra volunteer{additionalVolunteers !== 1 ? 's' : ''})</p>
      }
      <p>{description}</p>
    </article>
  )
}
