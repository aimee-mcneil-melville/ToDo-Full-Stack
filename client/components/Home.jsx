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
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Latitude is: ', position.coords.latitude)
        console.log('Longitude is: ', position.coords.longitude)
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      })
    } else {
      console.log('Not Available')
    }
    return fetchGardens()
      .then(gardens => {
        const coords = gardens.map(garden => {
          const gardenCoords = { lat: garden.lat, lon: garden.lon }
          return gardenCoords
        })
        const addresses = gardens.map(garden => garden.address)
        const userCords = [{ lat: this.props.user.latitude, lon: this.props.user.longitude }]
        this.setState({
          gardensCoordinates: coords,
          userCoordinates: userCords,
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
          <Link className="button is-primary my-4" to={'/garden'}>Garden</Link>
        </div>
        <Map
          userCoordinates={userCoordinates}
          gardensCoordinates={gardensCoordinates}
          addresses={addresses}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)
