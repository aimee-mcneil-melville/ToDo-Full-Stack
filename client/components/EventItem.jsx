import React from 'react'
import { Link } from 'react-router-dom'

export default function EventItem ({ event, isAdmin }) {
  const { id, title, date, volunteersNeeded, description } = event
  return (
    <div>
      <h4 className="is-pulled-left">{title}</h4>
      {
        isAdmin
          ? <Link to={`/events/${id}/edit`} className="button is-pulled-right">Edit Event</Link>
          : null
      }
      <p className="clearfix">{date}</p>
      <p>{volunteersNeeded} volunteers needed</p>
      <p>{description}</p>
    </div>
  )
}
