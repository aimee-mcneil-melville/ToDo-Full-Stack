import React from 'react'
import { useHistory } from 'react-router-dom'

import { addEvent } from './addEventHelper'

import EventForm from '../../../components/events/EventForm/EventForm'

export default function AddEvent () {
  const history = useHistory()

  function submitEvent (event) {
    addEvent(event, history.push)
  }
  const initialState = {
    title: '',
    date: '',
    volunteersNeeded: 0,
    description: ''
  }
  return (
    <EventForm
      formData={initialState}
      action='Create Event'
      submitEvent={submitEvent}
    />
  )
}
