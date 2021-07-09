import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import EventItem from '../EventItem/EventItem'

export default function Events ({ events }) {
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  return (
    <>
      <div>
        <h1>Events</h1>
        {
          isAdmin
            ? <Link to='/event/new' className='button'>Add New Event</Link>
            : null
        }
      </div>
      <section>
        {events.map((event) =>
          <EventItem key={event.id} event={event} isAdmin={isAdmin} />
        )}
      </section>
    </>
  )
}
