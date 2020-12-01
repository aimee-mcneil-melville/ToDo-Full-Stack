import React from 'react'
import { Link } from 'react-router-dom'

import Map from './Map'

function Home () {
  return (
    <>
      <div className='column is-half-tablet'>
        <p className='homeText'>Help your community get the most out of your garden with events and reporting and become eligible for government subsidies.</p>
        <Link className="button is-medium" to={'/garden'}>Get Started</Link>
      </div>
      <Map/>
    </>
  )
}
export default Home
