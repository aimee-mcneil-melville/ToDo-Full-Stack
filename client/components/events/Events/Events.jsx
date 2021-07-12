import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import EventItem from '../EventItem/EventItem'

export default function Events ({ events }) {
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  return (
    <>
      <h1 className='events-title'>Events</h1>
      <section>
        {events.map((event) =>
          <EventItem key={event.id} event={event} isAdmin={isAdmin} />
        )}
      </section>
      <div>
        {
          isAdmin
            ? <Link to='/event/new' className='button'>Add New Event</Link>
            : null
        }
      </div>
    </>
  )
}
