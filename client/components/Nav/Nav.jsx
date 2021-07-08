import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { clearUser } from '../../actions/user'
import { dispatch } from '../../store'

// import { logOut, logIn } from './navHelper'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated/Authenticated'

export default function Nav () {
  // const location = useLocation()
  // const navLinks = getLinks(location.pathname)
  const { logout, loginWithRedirect } = useAuth0()

  function logOut (e) {
    e.preventDefault()
    logout({ returnTo: window.location.origin })
    // logOff()
    dispatch(clearUser())
  }

  function logIn (e) {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <nav className="navbar column">
      <div className="navbar-item">
        <IfAuthenticated>
          <Link to="/" onClick={logOut} className='ml-4'>
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
          <Link to="/" onClick={logIn} className='ml-4'>
              Log in
          </Link>
          <Link to="/" className='ml-4'>Home</Link>

        </IfNotAuthenticated>
      </div>
    </nav>
  )
}
