import React from 'react'
import { Link } from 'react-router-dom'
import { getIfVolunteer, toggleVolunteerButton } from './eventItemHelper'

export default function EventItem ({ event, isAdmin }) {
  const { id, title, date, volunteersNeeded, description, volunteers } = event
  const isVolunteer = getIfVolunteer(volunteers)

  function clickHandler () {
    toggleVolunteerButton(id, isVolunteer)
  }

  return (
    <>
      <div className="level">
        <h4 className="level-item">{title}</h4>
        { isAdmin
          ? <Link to={`/events/${id}/edit`} className="button is-pulled-right level-item">Edit Event</Link>
          : !isVolunteer
            ? <button onClick={clickHandler} className=" button level-item">Volunteer</button>
            : <button onClick={clickHandler} className=" button level-item">Un-Volunteer</button>
        }
      </div>
      <p className="clearfix ">{date}</p>
      <p>{volunteersNeeded} volunteers needed</p>
      <p className="eventDesc">{description}</p>
    </>
  )
}
