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
        addresses={[address]}
      />
    </>
  )
}

const mapStateToProps = (state) => ({ garden: state.garden })
export default connect(mapStateToProps)(Garden)
