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
  // currently using initial state and wipes clear on refresh - needs attention
  // const { lat, lon } = useSelector(globalState => globalState.garden)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id)
      .then((event) => {
        setEvent(event)
        setVolunteering(event.isVolunteer)
        console.log(event) // event has lat and lon. now check for error
        return null
      })
  }, [])

  const { title, gardenName, gardenAddress, date, volunteersNeeded, description, volunteers, lat, lon } = event

  return (
    <>
      <article className='column'>
        <div className='columns'>
          <article className='column is-three-quarters'>
            <h2 className='title is-4'>{title}</h2>
            <dl className='description--inline'>
              <dt className='has-text-weight-bold'>Garden Name:</dt>
              <dd>{gardenName}</dd>

              <dt className = 'has-text-weight-bold'>Address:</dt>
              <dd>{gardenAddress}</dd>

              <dt className = 'has-text-weight-bold'>Date:</dt>
              <dd>{date}</dd>

              <dt className = 'has-text-weight-bold'>Volunteers Needed:</dt>
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
        </div>
      </article>
      {isAdmin
        ? <VolunteerList
          volunteers={volunteers}
          eventId={event.id}
        />
        : <Map
          coordinates={[{ lat, lon }]}
          addresses={[gardenAddress]}
        />
      }
    </>
  )
}
