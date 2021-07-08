import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { logOut, getLinks } from './navHelper'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated/Authenticated'

export default function Nav () {
  const location = useLocation()
  const navLinks = getLinks(location.pathname)

  return (
    <nav className="navbar column">
      <div className="navbar-item">
        <IfAuthenticated>
          <Link to="/" className='ml-4'>My Garden</Link>
          <Link to="/" onClick={logOut} className='ml-4'>
              Log out
          </Link>
          <Link to="/" className='ml-4'>Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {navLinks.map(({ to, name }) => (
            <Link key={to} to={to} className='ml-4'>
              {name}
            </Link>
          ))}
        </IfNotAuthenticated>
      </div>
    </nav>
  )
}
