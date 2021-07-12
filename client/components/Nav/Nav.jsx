import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import { logOut, logIn } from './navHelper'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated/Authenticated'
import { login, logout } from '../../auth-utils'

export default function Nav () {
  // const location = useLocation()
  // const navLinks = getLinks(location.pathname)
  const user = useSelector(globalState => globalState.user)

  return (
    <nav className="navbar column">
      <div className="navbar-item">
        <IfAuthenticated>
          <Link to={`/gardens/${user.gardenId}`} className='ml-4'>My Garden</Link>
          <Link to="/" onClick={logout} className='ml-4'>
              Log out
          </Link>
          <Link to="/" className='ml-4'>Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {/* {navLinks.map(({ to, name }) => (
            <Link key={to} to={to} className='ml-4'>
              {name}
            </Link>
          ))} */}
          <Link to="/" onClick={login} className='ml-4'>
              Log in/register
          </Link>
          <Link to="/" className='ml-4'>Home</Link>
        </IfNotAuthenticated>
      </div>
    </nav>
  )
}
