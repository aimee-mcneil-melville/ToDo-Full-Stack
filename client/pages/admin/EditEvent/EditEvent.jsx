import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { updateEvent, cancelEvent } from './editEventHelper'

import EventForm from '../../../components/events/EventForm/EventForm'
import { useSelector } from 'react-redux'
import { getEvent } from '../../Event/eventHelper'

export default function EditEvent () {
  const [event, setEvent] = useState(null)
  const history = useHistory()
  const { id } = useParams()
  const user = useSelector(globalState => globalState.user)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id, user)
      .then((eventData) => {
        setEvent(eventData)
        return null
      })
  }, [])

  function submitEvent (form) {
    updateEvent(event.gardenId, { id, ...form }, history.push)
  }

  function cancelSubmit () {
    cancelEvent(id, history.goBack)
  }

  return (
    event
      ? <EventForm
        formData={event}
        action='Update Event'
        submitEvent={submitEvent}
        cancelSubmit={cancelSubmit}
      />
      : null
  )
}
