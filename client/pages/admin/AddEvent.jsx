import React from 'react'
import { useHistory } from 'react-router-dom'

import { addEvent } from './addEventHelper'

import EventForm from '../../components/EventForm'

export default function AddEvent (props) {
  const history = useHistory()

  function submitEvent (event) {
    addEvent(event, history.push)
  }

  return (
    <EventForm
      action='Create Event'
      submitEvent={submitEvent}
    />
  )
}
