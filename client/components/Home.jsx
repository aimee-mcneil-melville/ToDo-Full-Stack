import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Map from './Map'
import { fetchGardens } from './gardenHelper'
import { setUserLocation } from '../actions/user'

class Home extends React.Component {
  state = {
    userCoordinates: [],
    gardensCoordinates: [],
    addresses: []
  }

  componentDidMount () {
    const setLocation = (location) => {
      this.props.dispatch(setUserLocation(location))
      this.setState({ userCoordinates: [{ lat: location.latitude, lon: location.longitude }] })
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      })
    }
    return fetchGardens()
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
