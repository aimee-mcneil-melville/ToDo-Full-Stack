import React from 'react'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div className='app'>
      <p>Home Page</p>
      <Link to={'/garden'}>Garden</Link>
    </div>
  )
}

export default Home
