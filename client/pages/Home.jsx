import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Map from '../components/Map'
import { getUserLocation, getGardenLocations } from './homeHelper'
// import { isAuthenticated } from './auth'

export default function Home () {
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [gardensCoordinates, setGardensCoordinates] = useState([])
  const [addresses, setAddresses] = useState([])
  const gardenId = useSelector(globalState => globalState.user.gardenId)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getGardenLocations()
      .then(({ gardenCoords, addrs }) => {
        setGardensCoordinates(gardenCoords)
        setAddresses(addrs)
        return null
      })
  }, [])

  useEffect(() => {
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
    <section className='columns'>
      <article className='column'>
        <div className='columns'>
          <p className='column is-three-quarters'>Help your community get the most out of your garden with events and reporting and become elgible for government subsidies</p>
        </div>
        <Link className='button' to='/gardens'>Get Started</Link>
      </article>
      <Map
        userCoordinates={userCoordinates}
        coordinates={gardensCoordinates}
        addresses={addresses}
      />
    </section>
  )
}
