import React from 'react'
import { Link } from 'react-router-dom'
import EventItem from './EventItem'

function Events ({ events }) {
  return (
    <div className="mr-6">
      <Link to='/events/new' className="button is-pulled-right mt-4 pt-1">Add New Event</Link>
      <h2 className="my-4 is-pulled-left">Events</h2>
      <div className="box clearfix">
        {events.map((event) =>
          <EventItem key={event.id} event={event} />
        )}
      </div>
    </div>
  )
}

export default Events
