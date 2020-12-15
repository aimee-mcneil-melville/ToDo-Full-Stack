import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Map from '../components/Map'
import { getUserLocation, getGardenLocations } from './homeHelper'

function Home () {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [gardensCoordinates, setGardensCoordinates] = useState([])
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    getUserLocation(setUserCoordinates)
    return getGardenLocations(setGardensCoordinates, setAddresses)
  }, [])

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

export default Home
