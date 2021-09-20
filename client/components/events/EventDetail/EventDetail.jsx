import React, { useEffect, useState } from 'react'
import { getEvent } from '../../../pages/Event/eventHelper'
import VolunteerButton from '../../volunteers/VolunteerButton/VolunteerButton'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

function EventDetail (props) {
  const { id, isAdmin } = props
  const [event, setEvent] = useState({})
  const [volunteering, setVolunteering] = useState(false)
  const history = useHistory()

  function redirectToEdit () {
    // console.log('redirectToEdit')
    history.push(`/events/${id}/edit`)
  }

  useEffect(() => {
    getEvent(id).then(res => {
      setEvent(res)
      setVolunteering(event.isVolunteer)
      return null
    }).catch(err => {
      console.log(err.message)
    })
  })
  return (
    <section className='card-secondary column-6'>
      <article className='card-inner'>
        <Link onClick={() => history.goBack()} className='card-close-button'>close</Link>
        <h1 className='card-title'>{event.title}</h1>
        <ul className='card-list'>
          <li>{event.gardenName}</li>
          <li>{event.gardenAddress}</li>
          <li>{event.date}</li>
          <li>Volunteers Needed: {event.volunteersNeeded}</li>
          <li>{event.description}</li>
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
  )
}

export default EventDetail
