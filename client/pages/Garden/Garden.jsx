import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Map from '../../components/Map/Map'
import Events from '../../components/events/Events/Events'
import { getGarden } from './gardenHelper'

export default function Garden () {
  const { id } = useParams()
  const garden = useSelector(globalState => globalState.garden)
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  useEffect(() => {
    getGarden(id)
  }, [id])

  const { name, description, address, url, events, lat, lon } = garden
  console.log(events)
  return (
    <section className='flex-container'>
      <div className='column-6'>
        <article className='column-9 scroll'>
          <h2>{name}</h2>
          <p>{description}</p>
          <a href={url}>{url}</a>
        </article>
        <Events events={events} />
      </div>
      <Map
        coordinates={[{ lat: lat, lon: lon }]}
        addresses={[address]}
        names={[name]}
      />
    </section>
  )
}
