import React from 'react'
import { Link } from 'react-router-dom'

import Map from './Map'

function Home () {
  return (
    <>
      <div className='column'>
        <p>Help your community get the most out of your garden with events and reporting and become elgible for government subsidies</p>
        <Link className="button is-primary my-4" to={'/garden'}>Garden</Link>
      </div>
      <Map/>
    </>
  )
}

export default Home
