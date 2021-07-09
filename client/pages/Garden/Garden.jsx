import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Map from '../../components/Map/Map'
import Events from '../../components/events/Events/Events'
import { getGarden } from './gardenHelper'

export default function Garden () {
  const { id } = useParams()
  const garden = useSelector(globalState => globalState.garden)

  useEffect(() => {
    getGarden(id)
  }, [id])

  const { name, description, address, url, events, lat, lon } = garden
  return (
    <>
      <article className='column'>
        <div className='columns'>
          <article className='column is-three-quarters'>
            <h2 className='title is-4'>{name}</h2>
            <p className='mb-2'>{description}</p>
            <a className='page__link' href={url}>{url}</a>
          </article>
        </div>
        <Events events={events} />
      </article>
      <Map
        coordinates={[{ lat: lat, lon: lon }]}
        addresses={[address]}
      />
    </>
  )
}
