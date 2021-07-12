import React, { useState, useEffect } from 'react'
import { getState, dispatch } from '../../store'
import { showError } from '../../actions/error'

import { useParams } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from '../../components/Authenticated/Authenticated'
import { getEventDetails, checkUserIds } from './emailVolunteerErrorHelper'
import VolunteerButton from '../../components/volunteers/VolunteerButton/VolunteerButton'

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
      <h1>uh oh spagettios!</h1>
      <p>You tried to sign up for <b>{event.title}</b> at <b>{event.gardenName}</b>... but something went wrong! 😱</p>
      <p>userId: {userId}</p>
      <p>eventId: {eventId}</p>
      <IfAuthenticated>
        {checkUserIds(userId, storeState.user.id) ? <VolunteerButton eventId={eventId} volunteering={false} setVolunteering={} /> : <p>Get out!</p>}
        <p>You are currently logged in as: {storeState.user.id}</p>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <p>You are Not logged in</p>
      </IfNotAuthenticated>
    </>
  )
}
