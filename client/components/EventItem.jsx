import React from 'react'
import { Link } from 'react-router-dom'

function EventItem ({ event, isAdmin }) {
  return (
    <div>
      <h4 className="is-pulled-left">{event.title}</h4>
        {isAdmin
        ? <Link to='/events/4/edit' className="button is-primary is-pulled-right">Edit Event</Link>
        : null
        }
      <p className="clearfix">{event.datetime}</p>
      <p>{event.volunteersNeeded} volunteers needed</p>
      <p>{event.description}</p>
    </div>
  )
}

export default EventItem
