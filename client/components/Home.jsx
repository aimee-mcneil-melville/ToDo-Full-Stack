import React from 'react'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div className='app'>
      <p>Home Page</p>
      <Link to={'/gardens'}>Gardens</Link>
    </div>
  )
}

export default Home
