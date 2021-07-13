import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getEvent } from './eventHelper'

import Map from '../../components/Map/Map'
import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import VolunteerButton from '../../components/volunteers/VolunteerButton/VolunteerButton'

export default function Event () {
  const { id } = useParams()

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

  const { title, gardenName, gardenAddress, date, volunteersNeeded, description, volunteers, lat, lon } = event
  return (
    <section className='flex-container'>
      <article className=''>
        <h2 className='title is-4'>{title}</h2>
        <dl className=''>
          <dt className='has-text-weight-bold'>Garden Name:</dt>
          <dd>{gardenName}</dd>

          <dt className='has-text-weight-bold'>Address:</dt>
          <dd>{gardenAddress}</dd>

          <dt className='has-text-weight-bold'>Date:</dt>
          <dd>{date}</dd>

          <dt className='has-text-weight-bold'>Volunteers Needed:</dt>
          <dd>{volunteersNeeded}</dd>
        </dl>
        <p className='has-text-weight-semibold'>{description}</p>
        {!isAdmin
          ? <VolunteerButton
            eventId={id}
            volunteering={volunteering}
            setVolunteering={setVolunteering}
          />
          : null
        }
      </article>
      {isAdmin
        ? <VolunteerList
          volunteers={volunteers}
          eventId={event.id}
        />
        : <Map
          coordinates={
            lat
              ? [{ lat, lon }]
              : []
          }
          addresses={[gardenAddress]}
          names={[gardenName]}
        />
      }
    </>
  )
}
