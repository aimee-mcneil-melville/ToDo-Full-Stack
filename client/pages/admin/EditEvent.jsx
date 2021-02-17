import React, { useState, useEffect } from 'react'

import { getEvent, updateEvent } from './editEventHelper'

import EventForm from '../../components/EventForm'

export default function EditEvent (props) {
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const { id } = props.match.params
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id)
      .then((eventData) => {
        setEvent(eventData)
        return null
      })
  }, [])

  function submitEvent (form) {
    const { id } = props.match.params
    const navigate = props.history.push
    updateEvent(id, form, navigate)
  }

  return (
    event
      ? <EventForm
        formData={event}
        action='Update Event'
        submitEvent={submitEvent}
      />
      : null
  )
}
