import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Map from './Map'
import { fetchGardens } from './gardenHelper'
import { setUserLocation } from '../actions/user'

class Home extends React.Component {
  state = {
    gardens: [],
    userLatitude: 1,
    userLongitude: 1
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
        this.setState({
          gardens: gardens,
          userLatitude: this.props.user.latitude,
          userLongitude: this.props.user.longitude
        })
        return null
      })
  }

  render () {
    const { gardens, userLatitude, userLongitude } = this.state
    return (
      <>
        <div className='column is-half-tablet'>
          <p>Help your community get the most out of your garden with events and reporting and become elgible for government subsidies</p>
          <Link className="button is-primary my-4" to={'/garden'}>Garden</Link>
        </div>
        <Map
          gardens={gardens}
          location={[{ userLatitude, userLongitude }]}/>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gardens: state.gardens,
    userLatitude: state.userLatitude,
    userLongitude: state.userLongitude
  }
}

export default connect(mapStateToProps)(Home)
