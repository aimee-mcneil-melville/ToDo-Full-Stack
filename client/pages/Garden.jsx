import React, { useEffect } from 'react'

import Map from '../components/Map'
import Events from '../components/Events'
import { getGarden, signedIn } from './gardenHelper'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

function Garden ({ garden }) {
  if (!signedIn()) return <Redirect to={'/signin'} />

  useEffect(() => {
    getGarden()
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

const mapStateToProps = (state) => ({ garden: state.garden })
export default connect(mapStateToProps)(Garden)
