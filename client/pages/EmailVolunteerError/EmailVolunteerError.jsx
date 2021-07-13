import React, { useState, useEffect } from 'react'
import { getState, dispatch } from '../../store'
import { showError } from '../../actions/error'
import VolunteerButton from '../../components/volunteers/VolunteerButton/VolunteerButton'

import { useParams } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from '../../components/Authenticated/Authenticated'
import { getEventDetails, checkUserIds } from './emailVolunteerErrorHelper'
import { Redirect, useHistory } from 'react-router'

export default function EmailVolunteerError () {
  const [event, setEvent] = useState({ title: '', gardenName: '' })
  const [volunteering, setVolunteering] = useState(false)
  const { userId, eventId } = useParams()
  const history = useHistory()
  const storeState = getState()

  useEffect(() => {
    getEventDetails(eventId, history)
      .then(event => {
        if (event) {
          setEvent({ title: event.title, gardenName: event.gardenName })
          setVolunteering(event.isVolunteer)
        }
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
        <p>No probs, just <a href={`/events/${eventId}`}>head over here to volunteer!</a></p>
        <VolunteerButton setVolunteering={() => { history.push(`/events/${eventId}`) }} eventId={eventId} volunteering={volunteering}/>

        {(!checkUserIds(userId, storeState.user.id)) &&
          <p><i>NOTE: You are currently logged in as:</i> <b>{storeState.user.username}</b> Not you? Click here to sign in</p>
        }

      </IfAuthenticated>
      <IfNotAuthenticated>
        <p>🦙 No prob-llama! 🦙 Simply <a href='/signin'>Sign in</a> to your account, then click the 'Volunteer' button on the garden page </p>
      </IfNotAuthenticated>
    </>
  )
}
