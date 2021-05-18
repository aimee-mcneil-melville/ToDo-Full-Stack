import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { getEvent, updateEvent } from './editEventHelper'

import EventForm from '../../../components/events/EventForm/EventForm'

export default function EditEvent () {
  const [event, setEvent] = useState(null)
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id)
      .then((eventData) => {
        setEvent(eventData)
        return null
      })
  }, [])

  function submitEvent (form) {
    updateEvent(id, form, history.push)
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
