import React from 'react'
import { Link } from 'react-router-dom'

import Nav from './Nav'

export default function Header () {
  return (
    <header className="columns is-mobile">
      <h1 className="logo column">
        <Link to="/">Garde<span>nz</span></Link>
      </h1>
      <Nav />
    </header>
  )
}
