import React from 'react'
import { Link } from 'react-router-dom'

function EventItem ({ event }) {
  return (
    <div>
      <h4 className="is-pulled-left">{event.title}</h4>
      <Link to='/event-details' className="button is-primary is-pulled-right">Edit Event
      </Link>
      <p className="clearfix">{event.datetime}</p>
      <p>{event.volunteersNeeded} volunteers needed</p>
      <p>{event.description}</p>
    </div>
  )
}

export default EventItem
