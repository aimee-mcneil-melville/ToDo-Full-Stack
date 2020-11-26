import React from 'react'
import { Link } from 'react-router-dom'
import EventItem from './EventItem'

function Events ({ events, isAdmin}) {
  return (
    <div className="m-6">
      <h2 className="my-4 is-pulled-left">Events</h2>
        {isAdmin
        ? <Link to='/events/new' className="button my-4 is-primary is-pulled-right">Add new event</Link>
        : null
        }
      <div className="box clearfix">
        {events.map((event) =>
          <EventItem key={event.id} event={event} isAdmin={isAdmin} />
        )}
      </div>
    </div>
  )
}

export default Events
