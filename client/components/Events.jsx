import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import EventItem from './EventItem'

function Events ({ events }) {
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  return (
    <>
      <div className='is-flex'>
        <h1 className='title is-4 is-flex-grow-1'>Events</h1>
        {
          isAdmin
          ? <Link to='/events/new' className='button'>Add New Event</Link>
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

export default Events
