import React from 'react'
import { Link } from 'react-router-dom'
import EventItem from './EventItem'

const events = [{ title: 'Weeds worker bee', datetime: '28/09/2020 8.00 am', volunteersNeeded: '8', description: 'We need to weed the upper planting beds' }]

function Events () {
  return (
    <>
    <h2 className="my-4">Events</h2>
    <Link to='/AddNewEvent'>
      <button>Add new event</button>
      </Link>
    <div className="box">
      {events.map((event, index) =>
        <EventItem key={index} event={event} />
      )}
    </div>
    </>
  )
}

export default Events
