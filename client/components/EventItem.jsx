import React from 'react'
import { Link } from 'react-router-dom'
import { toggleVolunteerStatus } from './eventItemHelper'

export default function EventItem ({ event, isAdmin }) {
  const { id, title, date, volunteersNeeded, description, totalVolunteers, isVolunteer } = event

  const remainingVolunteers = volunteersNeeded - totalVolunteers
  const additionalVolunteers = Math.abs(remainingVolunteers)

  function clickHandler () {
    toggleVolunteerStatus(id, isVolunteer)
  }

  return (
    <>
      <article className='box my-5'>
        <div className="is-flex">
          <h2 className='title is-5 is-flex-grow-1'>{title}</h2>
          {isAdmin
            ? <Link to={`/events/${id}/edit`} className='button'>Edit Event</Link>
            : !isVolunteer
              ? <button onClick={clickHandler} className='button'>Volunteer</button>
              : <button onClick={clickHandler} className='button'>Un-Volunteer</button>
          }
        </div>
        <p>{date}</p>
        {remainingVolunteers >= 0
          ? <p>Volunteers needed: {remainingVolunteers} out of {volunteersNeeded} </p>
          : <><p>Volunteers needed: 0 out of {volunteersNeeded} &nbsp;&nbsp; | &nbsp;&nbsp; (Extra Volunteers: {additionalVolunteers}) </p></>
        }
        <p>{description}</p>
      </article>
    </>
  )
}
