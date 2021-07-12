import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Map from '../../components/Map/Map'
import Events from '../../components/events/Events/Events'
import { getGarden } from './gardenHelper'
import EventDetailCard from '../../components/events/EventDetailCard/EventDetailCard'

export default function Garden () {
  const { id } = useParams()
  const garden = useSelector(globalState => globalState.garden)
  // const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  useEffect(() => {
    getGarden(id)
  }, [id])

  const { name, description, address, url, events, lat, lon } = garden
  return (
    <section className='flex-container'>
      <article className='event-item-container'>
        <article>
          <h2>{name}</h2>
          <p>{description}</p>
          <a href={url}>{url}</a>
        </article>
        <Events events={events} />
      </article>
      {/* <EventDetailCard />  This is the event details card, uncomment it to use it */}
      <Map
        coordinates={[{ lat: lat, lon: lon }]}
        addresses={[address]}
      />
    </section>
  )
}
