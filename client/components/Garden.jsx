import React from 'react'

import Map from './Map'
import Events from './Events'
import { getGarden } from './gardenHelper'

class Garden extends React.Component {
  state = {
    name: '',
    description: '',
    url: '',
    events: [],
    lat: 1,
    lon: 1
  }

  componentDidMount () {
    return getGarden()
      .then(garden => {
        this.setState(garden)
        return null
      })
  }

  render () {
    const { name, description, url, events, lat, lon } = this.state
    return (
      <>
        <div className="column">
          <h3>{name}</h3>
          <p className="mb-4">{description}</p>
          <a className="word-wrap" href={url}>{url}</a>

          <Events events={events} />
        </div>
        <Map coordinates={[{ lat: lat, lon: lon }]}/>
      </>
    )
  }
}

export default Garden
