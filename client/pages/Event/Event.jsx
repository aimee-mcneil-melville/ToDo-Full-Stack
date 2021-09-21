import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { getEvent } from './eventHelper'

import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import AddVolunteerForm from '../../components/volunteers/RockUpVolunteerForm/AddVolunteerForm'
import RockUpVolunteerList from '../../components/volunteers/RockUpVolunteerList/RockUpVolunteerList'
import EventDetail from '../../components/events/EventDetail/EventDetail'

export default function Event () {
  const { id, eventId } = useParams()
  const history = useHistory()

  const [event, setEvent] = useState({})

  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id)
      .then((event) => {
        setEvent(event)
        return null
      })
  }, [])

  function redirectToEdit () {
    // console.log('redirectToEdit')
    history.push(`/events/${id}/edit`)
  }

  function addExtraVolunteer (newVolunteer) {
    setEvent({
      ...event,
      extraVolunteers: [...event.extraVolunteers, newVolunteer]
    })
  }

  const { volunteers, extraVolunteers } = event

  return (
    <>
      {isAdmin
        ? <>
          <section>
            <VolunteerList
              volunteers={volunteers}
              eventId={event.id}
            />
            <RockUpVolunteerList
              extraVolunteers={extraVolunteers}
            />
            <AddVolunteerForm
              addExtraVolunteer={addExtraVolunteer}
              id={id}
            />
          </section>
        </>
        : null
      }
      <EventDetail eventId={eventId} isAdmin={isAdmin} />
    </>
  )
}
