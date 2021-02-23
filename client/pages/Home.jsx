import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Map from '../components/Map'
import { getUserLocation, getGardenLocations } from './homeHelper'

export default function Home () {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [gardensCoordinates, setGardensCoordinates] = useState([])
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getGardenLocations()
      .then(({ gardenCoords, addrs }) => {
        setGardensCoordinates(gardenCoords)
        setAddresses(addrs)
        return null
      })

    let mounted = true

    function isMounted () {
      return mounted
    }

    getUserLocation((location) => {
      setUserCoordinates(location)
    }, isMounted)

    // you can return a "clean up" function from useEffect - this runs when
    // the component unmounts
    return () => {
      mounted = false
    }
  }, [])

  return (
    <>
      <div className='column'>
        <p>Help your community get the most out of your garden with events and reporting and become elgible for government subsidies</p>
        <Link className="button homeButton" to={'/garden'}>Get Started</Link>
      </div>
      <Map
        userCoordinates={userCoordinates}
        coordinates={gardensCoordinates}
        addresses={addresses}
      />
    </>
  )
}
