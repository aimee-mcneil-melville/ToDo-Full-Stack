import React, { useState, useEffect } from 'react'

import Map from '../components/Map'
import Events from '../components/Events'
import { getGarden, signedIn } from './gardenHelper'
import { Redirect } from 'react-router'

export default function Garden () {
  if (!signedIn()) return <Redirect to={'/signin'} />

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
    // eslint-disable-next-line promise/catch-or-return
    getGarden()
      .then((gardenData) => {
        setGarden(gardenData)
        return null
      })
  }, [])

  const { name, description, address, url, events, lat, lon } = garden
  return (
    <>
      <div className="column garden">
        <h2>{name}</h2>
        <p className="mb-4">{description} </p>
        <p><a className="gardenLink word-wrap" href={url}>{url}</a></p>
        <Events events={events} />
      </div>
      <Map
        coordinates={[{ lat: lat, lon: lon }]}
        addresses={[address]}
      />
    </>
  )
}
