import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getEvent } from './eventHelper'

import Map from '../../components/Map/Map'
import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import VolunteerButton from '../../components/volunteers/VolunteerButton/VolunteerButton'
import EventDetailCard from '../../components/events/EventDetailCard/EventDetailCard'

export default function Event () {
  const { id } = useParams()

  const [event, setEvent] = useState({})
  const [volunteering, setVolunteering] = useState(false)

  const isAdmin = useSelector(globalState => globalState.user.isAdmin)
  // currently using initial state and wipes clear on refresh - needs attention
  const { lat, lon, address } = useSelector(globalState => globalState.garden)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id)
      .then((event) => {
        setEvent(event)
        setVolunteering(event.isVolunteer)
        return null
      })
  }, [])

  const { title, gardenName, gardenAddress, date, volunteersNeeded, description, volunteers } = event

  return (
    <section className='card-container'>
      <button className='card-close-button'>close</button>
      <article className='card-text-container'>
        <h1 className='card-title'>{title}</h1>
        <h2 className='card-sub-title'>Garden Name: {gardenName}</h2>
        <h3 className='card-text'>Address: {gardenAddress}</h3>
        <h3 className='card-text'>Date: {date}</h3>
        <h3 className='card-text'>Volunteers Needed: {volunteersNeeded}</h3>
        <h3 className='card-text'>Description: {description}
          <h3 className='card-text'></h3>
          {isAdmin
            ? <VolunteerList
              volunteers={volunteers}
              eventId={event.id}
            />
            : <Map
              coordinates={[{ lat, lon }]}
              addresses={[address]}
            />
          }
        </h3>
      </article>
      <section className='button-inline-container'>
        <button className='edit-event-button'>Edit Event</button>
        <button className='edit-event-button'>Event Admin</button>
      </section>
    </section>

  // <section className='flex-container'>
  //   <article className=''>
  //     <h2 className='title is-4'>{title}</h2>
  //     <dl className=''>
  //       <dt className='has-text-weight-bold'>Garden Name:</dt>
  //       <dd>{gardenName}</dd>

  //       <dt className='has-text-weight-bold'>Address:</dt>
  //       <dd>{gardenAddress}</dd>

  //       <dt className='has-text-weight-bold'>Date:</dt>
  //       <dd>{date}</dd>

  //       <dt className='has-text-weight-bold'>Volunteers Needed:</dt>
  //       <dd>{volunteersNeeded}</dd>
  //     </dl>
  //     <p className='has-text-weight-semibold'>{description}</p>
  //     {!isAdmin
  //       ? <VolunteerButton
  //         eventId={id}
  //         volunteering={volunteering}
  //         setVolunteering={setVolunteering}
  //       />
  //       : null
  //     }
  //   </article>
  //   <EventDetailCard/>
  // </section>
  )
}

// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

// import { getEvent } from './eventHelper'

// import Map from '../../components/Map/Map'
// import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
// import VolunteerButton from '../../components/volunteers/VolunteerButton/VolunteerButton'
// import EventDetailCard from '../../components/events/EventDetailCard/EventDetailCard'

// export default function Event () {
//   const { id } = useParams()

//   const [event, setEvent] = useState({})
//   const [volunteering, setVolunteering] = useState(false)

//   const isAdmin = useSelector(globalState => globalState.user.isAdmin)
//   // currently using initial state and wipes clear on refresh - needs attention
//   const { lat, lon, address } = useSelector(globalState => globalState.garden)

//   useEffect(() => {
//     // eslint-disable-next-line promise/catch-or-return
//     getEvent(id)
//       .then((event) => {
//         setEvent(event)
//         setVolunteering(event.isVolunteer)
//         return null
//       })
//   }, [])

//   const { title, gardenName, gardenAddress, date, volunteersNeeded, description, volunteers } = event

//   return (
//     <section className='flex-container'>
//       <article className=''>
//         <h2 className='title is-4'>{title}</h2>
//         <dl className=''>
//           <dt className='has-text-weight-bold'>Garden Name:</dt>
//           <dd>{gardenName}</dd>

//           <dt className='has-text-weight-bold'>Address:</dt>
//           <dd>{gardenAddress}</dd>

//           <dt className='has-text-weight-bold'>Date:</dt>
//           <dd>{date}</dd>

//           <dt className='has-text-weight-bold'>Volunteers Needed:</dt>
//           <dd>{volunteersNeeded}</dd>
//         </dl>
//         <p className='has-text-weight-semibold'>{description}</p>
//         {!isAdmin
//           ? <VolunteerButton
//             eventId={id}
//             volunteering={volunteering}
//             setVolunteering={setVolunteering}
//           />
//           : null
//         }
//       </article>
//       <EventDetailCard/>
//     </section>
//   )
// }
