import React from 'react'

const events = [{title: 'Weeds worker bee', day: '28/09/2020', time: '8.00 am', volunteers: '8', description: 'We need to weed the upper planting beds'}]

function EventItem () {
  return (
    <div>
      {events.map(event => 
        <div>
          <h4>{event.title}</h4>
          <p>{event.day} at {event.time}</p>
          <p>{event.volunteers} needed</p>
          <p>{event.description}</p>          
        </div>)}
    </div>
  )
} 

export default EventItem