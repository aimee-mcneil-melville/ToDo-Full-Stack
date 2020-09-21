import React from 'react'
import { Link } from 'react-router-dom'
import EventItem from './EventItem'

const events = [{ title: 'Weeds worker bee', datetime: '28/09/2020 8.00 am', volunteersNeeded: '8', description: 'We need to weed the upper planting beds' }]

function Events () {
  return (
    <div className="m-6">
    <h2 className="my-4 is-pulled-left">Events</h2>
    <Link to='/events/new' className="button my-4 is-primary is-pulled-right">Add new event</Link>
    <div className="box clearfix">
      {events.map((event, index) =>
        <EventItem key={index} event={event} />
      )}
    </div>
     </div>
  )
}

export default Events

// component did mount = useEffect 
// - function API call to get DB info