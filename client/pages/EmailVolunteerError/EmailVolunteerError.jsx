import React, { useState, useEffect } from 'react'
import { getState, dispatch } from '../../store'
import { showError } from '../../actions/error'

import { useParams } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from '../../components/Authenticated/Authenticated'
import { getEventDetails, checkUserIds } from './emailVolunteerErrorHelper'

export default function EmailVolunteerError () {
  const [event, setEvent] = useState({ title: '', gardenName: '' })
  const { userId, eventId } = useParams()
  const storeState = getState()
  useEffect(() => {
    getEventDetails(eventId)
      .then(event => {
        setEvent({ title: event.title, gardenName: event.gardenName })
        return null
      })
      .catch((error) => {
        dispatch(showError(error.message))
      })
  }, [])
  return (
    <>
      <h1> 🐌 🐌 uh oh spagettios! 🐌 🐌 </h1>
      <p>You tried to sign up for <b>{event.title}</b> at <b>{event.gardenName}</b>... but something went wrong! 😱</p>

      <IfAuthenticated>
        <p>No probs, just <a href={`/events/${eventId}`}>click here to visit the event page,</a> then click the volunteer button!</p>
        {(!checkUserIds(userId, storeState.user.id)) &&
          <p><i>WARNING: You are currently logged in as:</i> <b>{storeState.user.username}</b></p>
        }

      </IfAuthenticated>
      <IfNotAuthenticated>
        <p>🦙 No prob-llama! 🦙 Simply <a href='/signin'>Sign in</a> to your account, then click the 'Volunteer' button on the garden page </p>
      </IfNotAuthenticated>
    </>
  )
}
