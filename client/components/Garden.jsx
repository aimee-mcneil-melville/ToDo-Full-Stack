import React from 'react'

import Map from './Map'
import Events from './Events'
import { getGarden } from './gardenHelper'

class Garden extends React.Component {
  state = {
    name: '',
    description: '',
    url: '',
    events: []
  }

  componentDidMount () {
    return getGarden()
      .then(garden => {
        this.setState(garden)
        return null
      })
  }

  render () {
    const { name, description, url, events } = this.state
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
        <Map/>
      </>
    )
  }
}

export default Garden
