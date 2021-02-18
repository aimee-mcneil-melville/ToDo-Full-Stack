import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getIfVolunteer } from './EventItemHelper'

export default function EventItem ({ event, isAdmin }) {
  const { id, title, date, volunteersNeeded, description } = event
  // volunteers to be recieved from event object
  const volunteers = ['member', 'anna', 'tausani']

  useEffect(() => {
    const ifVolunteer = getIfVolunteer(volunteers)
    setIsVolunteer(ifVolunteer)
  }, [])

  const [isVolunteer, setIsVolunteer] = useState(false)

  function clickHandler () {
    setIsVolunteer(!isVolunteer)
  }

  return (
    <div>
      <h4 className="is-pulled-left">{title}</h4>
      {
        isAdmin
          ? <Link to={`/events/${id}/edit`} className="button is-pulled-right">Edit Event</Link>
          : !isVolunteer
            ? <button onClick={clickHandler} className="button is-pulled-right">Volunteer</button>
            : <button onClick={clickHandler} className="button is-pulled-right">Un-Volunteer</button>

      }
      <p className="clearfix">{date}</p>
      <p>{volunteersNeeded} volunteers needed</p>
      <p>{description}</p>
    </div>
  )
}
