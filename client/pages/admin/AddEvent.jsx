import React from 'react'
import { addEvent } from './addEventHelper'

import EventForm from '../../components/EventForm'

export default function AddEvent (props) {
  function submitEvent (event) {
    const navigate = props.history.push
    addEvent(event, navigate)
  }

  return (
    <EventForm
      action='Create Event'
      submitEvent={submitEvent}
    />
  )
}
