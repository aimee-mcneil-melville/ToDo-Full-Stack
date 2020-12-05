import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Map from './Map'
import { getUserLocation, getGardenLocations } from './homeHelper'

class Home extends React.Component {
  state = {
    userCoordinates: null,
    gardensCoordinates: [],
    addresses: []
  }

  componentDidMount () {
    getUserLocation((userCoords) => {
      this.setState(userCoords)
    })
    return getGardenLocations()
      .then(gardens => {
        const coords = gardens.map(garden => {
          const gardenCoords = { lat: garden.lat, lon: garden.lon }
          return gardenCoords
        })
        const addresses = gardens.map(garden => garden.address)
        this.setState({
          gardensCoordinates: coords,
          addresses: addresses
        })
        return this.state
      })
  }

  render () {
    const { userCoordinates, gardensCoordinates, addresses } = this.state
    return (
      <>
        <div className='column is-half-tablet'>
          <p>Help your community get the most out of your garden with events and reporting and become elgible for government subsidies</p>
          <Link className="button is-medium my-4 mt-6" to={'/garden'}>Get Started</Link>
        </div>
        <Map
          userCoordinates={userCoordinates}
          coordinates={gardensCoordinates}
          address={addresses}
        />
      </>
    )
  }
}

export default connect()(Home)
