import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { getEvent } from './eventHelper'

import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import VolunteerButton from '../../components/volunteers/VolunteerButton/VolunteerButton'
import AddVolunteerForm from '../../components/volunteers/RockUpVolunteerForm/AddVolunteerForm'
import RockUpVolunteerList from '../../components/volunteers/RockUpVolunteerList/RockUpVolunteerList'

export default function Event () {
  const { id } = useParams()
  const history = useHistory()

  const [event, setEvent] = useState({})

  const [volunteering, setVolunteering] = useState(false)
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id)
      .then((event) => {
        setEvent(event)
        setVolunteering(event.isVolunteer)
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

  const { title, gardenName, gardenAddress, date, volunteersNeeded, description, volunteers, lat, lon, extraVolunteers } = event

  return (
    <section className='card-container'>

      <button className='card-close-button'>close</button>

      <article className='card-text-container'>
        <h1 className='card-title'>{title}</h1>
        <h2 className='card-sub-title'>Garden Name: {gardenName}</h2>
        <h3 className='card-text'>Address: {gardenAddress}</h3>
        <h3 className='card-text'>Date: {date}</h3>
        <h3 className='card-text'>Volunteers Needed: {volunteersNeeded}</h3>
        <h3 className='card-text'>Description: {description}</h3>
        {!isAdmin
          ? <VolunteerButton
            eventId={id}
            volunteering={volunteering}
            setVolunteering={setVolunteering}
          />
          : <section className='button-inline-container'>
            <button onClick={redirectToEdit} className='edit-event-button'>Edit Event</button>
            <button className='edit-event-button'>Event Admin</button>
          </section>
        }
      </article>
      {isAdmin
        ? <>
          <VolunteerList
            volunteers={volunteers}
            eventId={event.id}
          />
          <RockUpVolunteerList
            extraVolunteers={extraVolunteers}
          />
          <AddVolunteerForm
            addExtraVolunteer={addExtraVolunteer}
          />
        </>
        : null
      }
    </section>
  )
}
