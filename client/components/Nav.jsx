import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { logOut, getLinks } from './navHelper'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav () {
  const location = useLocation()
  const navLinks = getLinks(location.pathname)

  return (
    <nav className="navbar column">
      <IfAuthenticated>
        <Link to="/" onClick={logOut}>
            Log out
        </Link>
        <Link to="/">Home</Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        {navLinks.map(({ to, name }) => (
          <Link key={to} to={to}>
            {name}
          </Link>
        ))}
      </IfNotAuthenticated>
    </nav>
  )
}
