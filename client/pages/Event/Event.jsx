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
            />
          </section>
        </>
        : null
      }
      <section className='card-secondary column-6'>
        <article className='card-inner'>
          <button className='card-close-button'>close</button>
          <h1 className='card-title'>{title}</h1>
          <ul className='card-list'>
            <li>{gardenName}</li>
            <li>{gardenAddress}</li>
            <li>{date}</li>
            <li>Volunteers Needed: {volunteersNeeded}</li>
            <li>{description}</li>
          </ul>
          {!isAdmin
            ? <VolunteerButton
              eventId={id}
              volunteering={volunteering}
              setVolunteering={setVolunteering}
            />
            : <>
              <button onClick={redirectToEdit} className='button-secondary'>Edit Event</button>
              <button className='button-secondary'>Event Admin</button>
            </>
          }
        </article>
      </section>
    </>
  )
}
