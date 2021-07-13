// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

// import VolunteerButton from '../../volunteers/VolunteerButton/VolunteerButton'
// import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import React, { useEffect, useState } from 'react'
import { Route, Redirect, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getEvent } from '../../../pages/Event/eventHelper'

// import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
// import VolunteerButton from '../../components/volunteers/VolunteerButton/VolunteerButton'

// import { Link } from 'react-router-dom'

export default function EventDetailCard () {
  const { id } = useParams()

  const [event, setEvent] = useState({})
  const [volunteering, setVolunteering] = useState(false)

  const isAdmin = useSelector(globalState => globalState.user.isAdmin)
  // currently using initial state and wipes clear on refresh - needs attention
  // const { lat, lon, address } = useSelector(globalState => globalState.garden)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id)
      .then((event) => {
        setEvent(event)
        setVolunteering(event.isVolunteer)
        return null
      })
  }, [])

  return (
    <section className='card-container'>
      <button className='card-close-button'>close</button>
      <article className='card-text-container'>
        <h1 className='card-title'>Weeding Working Bee</h1>
        <h2 className='card-sub-title'>2021/2/2at 10:00am</h2>
        <h2 className='card-sub-title'>8/10 Volunteers</h2>
        <h3 className='card-text'>Description Description Description Description
        Description Description Description Description Description
        Description Description Description Description Description
        </h3>
      </article>
      {!isAdmin
        ? <><button className='card-volunteer-button'>Volunteer</button></>
        : <section className='button-inline-container'>
          <button className='edit-event-button'>Edit Event</button>
          <button className='edit-event-button'>Event Item</button>
        </section>
      }
      {/* <button className='card-volunteer-button '>Volunteer</button> */}
    </section>
  )
}
