import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getEvent } from './eventHelper'

import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import AddVolunteerForm from '../../components/volunteers/RockUpVolunteerForm/AddVolunteerForm'
import RockUpVolunteerList from '../../components/volunteers/RockUpVolunteerList/RockUpVolunteerList'
// import EventDetail from '../../components/events/EventDetail/EventDetail'

export default function Event() {
  const { id } = useParams()

  const [event, setEvent] = useState({})

  const user = useSelector((globalState) => globalState.user)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id, user).then((event) => {
      setEvent(event)
      return null
    })
  }, [user])

  function addExtraVolunteer(newVolunteer) {
    setEvent({
      ...event,
      extraVolunteers: [...event.extraVolunteers, newVolunteer],
    })
  }

  return (
    <>
      {user?.isAdmin ? (
        <>
          <section>
            <VolunteerList volunteers={event.volunteers} eventId={event.id} />
            <RockUpVolunteerList extraVolunteers={event.extraVolunteers} />
            <AddVolunteerForm addExtraVolunteer={addExtraVolunteer} id={id} />
          </section>
        </>
      ) : null}
      {/* <EventDetail eventId={eventId} user={user} /> */}
    </>
  )
}
