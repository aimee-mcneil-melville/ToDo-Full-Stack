import React from 'react'
import { Link } from 'react-router-dom'

function EventItem ({ event }) {
  return (
    <div>
      <h4 >{event.title}</h4>
      <Link to='/event-details'>
      <button>Edit Event</button>
      </Link>
      <p>{event.datetime}</p>
      <p>{event.volunteersNeeded} volunteers needed</p>
      <p>{event.description}</p>
    </div>
  )
}

export default EventItem
