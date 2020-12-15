import React, { useState, useEffect } from 'react'

import Map from '../components/Map'
import Events from '../components/Events'
import { getGarden } from './gardenHelper'

function Garden () {
  const [garden, setGarden] = useState({
    name: '',
    description: '',
    url: '',
    events: [],
    address: '',
    lat: 0,
    lon: 0
  })

  useEffect(() => {
    return getGarden(setGarden)
  }, [])

  const { name, description, address, url, events, lat, lon } = garden
  return (
    <>
      <div className="column">
        <h3>{name}</h3>
        <div className='gardenInfo mb-10'>
          <p className="mb-4">{description}</p>
          <a className="word-wrap " href={url}><em><u>{url}</u></em></a>
        </div>
        <Events events={events} />
      </div>
      <Map
        coordinates={[{ lat: lat, lon: lon }]}
        address={address}
      />
    </>
  )
}

export default Garden
