import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { dispatch } from '../../store'

import VolunteerButton from '../../components/volunteers/VolunteerButton/VolunteerButton'

import { useParams } from 'react-router-dom'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../../components/Authenticated/Authenticated'
import { getEventDetails, checkUserIdsMatch } from './emailVolunteerErrorHelper'
import { useHistory } from 'react-router'
import { getLogoutFn } from '../../auth-utils'
import { clearUser } from '../../actions/user'

export default function EmailVolunteerError() {
  const [event, setEvent] = useState({ title: '', gardenName: '' })
  const { userId, eventId } = useParams()
  const history = useHistory()
  const browserFirstName = useSelector(
    (globalState) => globalState.user.firstName
  )

  const browserUserId = useSelector((globalState) => globalState.user.id)
  const logout = getLogoutFn(useAuth0)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEventDetails(eventId, history).then((event) => {
      if (event) {
        setEvent({ title: event.title, gardenName: event.gardenName })
      }
      return null
    })
  }, [])

  function logOutSignIn() {
    logout()
    dispatch(clearUser())
    history.push('/signin')
  }

  function redirectToEvent() {
    history.push(`/events/${eventId}`)
  }

  return (
    <>
      <h1> 🐌 🐌 uh oh spagettios! 🐌 🐌 </h1>
      <p role="event-details">
        You tried to sign up for <b>{event.title}</b> at{' '}
        <b>{event.gardenName}</b>... but something went wrong! 😱
      </p>

      <IfAuthenticated>
        <p role="message">Don&apos;t stress, just click this button ⬇️⬇️ </p>
        <VolunteerButton
          setVolunteering={redirectToEvent}
          eventId={eventId}
          volunteering={false}
        />

        {!checkUserIdsMatch(userId, browserUserId) && (
          <p>
            <i role="alert-msg">NOTE: You are currently logged in as:</i>{' '}
            <b>{browserFirstName}</b> Not you?{' '}
            <button onClick={logOutSignIn}>Click here</button>
          </p>
        )}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <p role="message">
          🦙 No prob-llama! 🦙 Simply <a href="/signin">Sign in</a> to your
          account, then click the &apos;Volunteer&apos; button
        </p>
      </IfNotAuthenticated>
    </>
  )
}
