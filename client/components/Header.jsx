import React from 'react'
import { Link } from 'react-router-dom'

import Nav from './Nav/Nav'
import WaitIndicator from '../components/WaitIndicator/WaitIndicator'

export default function Header () {
  return (
    <header className="header-container">
      <div className="header-wrapper">
        <Link className="logo-wrapper" to="/">
          <img src='/images/gardenzLogo.svg' alt="gardenzlogo" className='logo-image' />
        </Link>
      </div>
      <WaitIndicator />
      <Nav />
    </header>
  )
}
