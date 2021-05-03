import React from 'react'
import { Link } from 'react-router-dom'

import Nav from './Nav'
import WaitIndicator from '../components/WaitIndicator'

export default function Header () {
  return (
    <header className="columns is-mobile">
      <div className="column">
        <Link className="logo title is-size-1-desktop" to="/">Garde<span>nz</span></Link>
      </div>
      <WaitIndicator />
      <Nav />
    </header>
  )
}
