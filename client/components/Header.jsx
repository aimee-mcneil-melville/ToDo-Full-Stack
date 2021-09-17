import React from 'react'
import { Link } from 'react-router-dom'

import Nav from './Nav/Nav'
import WaitIndicator from '../components/WaitIndicator/WaitIndicator'

export default function Header () {
  return (
    <header className="container">
      <div className="flex-container">
        <Link to="/">
          <div className="logo-container">
            <img src='/images/gardenzLogo.svg' alt="gardenzlogo" className='logo-image' />
          </div>
        </Link>
        <WaitIndicator />
        <Nav />
      </div>
    </header>
  )
}
