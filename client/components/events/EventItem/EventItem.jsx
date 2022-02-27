import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Collapsible from 'react-collapsible'
import VolunteerButton from '../../volunteers/VolunteerButton/VolunteerButton'

export default function EventItem({ gardenid, event, isAdmin }) {
  const [open, setOpen] = useState(false)
  const {
    id,
    title,
    date,
    volunteersNeeded,
    totalVolunteers,
    isVolunteer,
    status,
  } = event
  const [isVolunteering, setIsVolunteering] = useState(isVolunteer)
  const remainingVolunteers = volunteersNeeded - totalVolunteers
  const additionalVolunteers = Math.abs(remainingVolunteers)

  useEffect(() => {
    setIsVolunteering(isVolunteer)
  }, [isVolunteer])

  function handleCollapse() {
    setOpen(!open)
  }

  return (
    <div className="collapsible__content-inner">
      <Collapsible
        trigger={
          <h2 className="card-title">
            <a href="#" to={`/gardens/${gardenid}/events/${id}`}>
              {title}
            </a>
          </h2>
        }
        {...{ open, handleCollapse }}
      >
        <article className="card-primary">
          <ul className="list-primary">
            <li>{date}</li>
            {remainingVolunteers > 0 ? (
              <li>
                {remainingVolunteers} of {volunteersNeeded} volunteers still
                needed
              </li>
            ) : (
              <li>
                No more volunteers needed, but we can always use more hands!
                (Currently {additionalVolunteers} extra volunteer
                {additionalVolunteers !== 1 ? 's' : ''})
              </li>
            )}
            <li>Event is {status}</li>
          </ul>
          {isAdmin ? (
            <Link to={`/events/${id}/edit`} className="button-secondary">
              Edit Event
            </Link>
          ) : (
            <VolunteerButton
              eventId={id}
              volunteering={isVolunteering}
              setVolunteering={setIsVolunteering}
            />
          )}
          {/* Does below need to go here */}
          {/* <Link to={`/events/${id}`}>View Event</Link> */}
        </article>
      </Collapsible>
    </div>
  )
}
