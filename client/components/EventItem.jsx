import React from 'react'

function EventItem ({ event }) {
  return (
    <div>
      <h4 >{event.title}</h4>
      <p>{event.datetime}</p>
      <p>{event.volunteersNeeded} volunteers needed</p>
      <p>{event.description}</p>
    </div>
  )
} 

export default EventItem