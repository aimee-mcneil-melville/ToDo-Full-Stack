import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import EventItem from './EventItem'

function Events ({ events }) {
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  return (
    <>
      {
        isAdmin
          ? <Link to='/events/new' className="button my-4 is-pulled-right">Add New Event</Link>
          : null
      }
      <h2>Events</h2>
      <div className="event-box clearfix">
        {events.map((event) =>
          <EventItem key={event.id} event={event} isAdmin={isAdmin} />
        )}
      </div>
    </>
  )
}

export default Events
