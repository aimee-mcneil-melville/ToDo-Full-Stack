import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import {
  IfAuthenticated,
  IfNotAuthenticated
} from '../Authenticated/Authenticated'
import { getLoginFn, getLogoutFn } from '../../auth-utils'

export default function Nav () {
  const login = getLoginFn(useAuth0)
  const logout = getLogoutFn(useAuth0)
  const gardenId = useSelector(globalState => globalState.user.gardenId)

  function handleLogin (event) {
    event.preventDefault()
    login()
  }

  function handleLogoff (event) {
    event.preventDefault()
    logout()
  }

  return (
    <nav className="navbar column">
      <div className="navbar-item">
        <Link to="/" className='ml-4'>Home</Link>

        <IfAuthenticated>
          <Link to={`/gardens/${gardenId}`} className='ml-4'>My Garden</Link>
          <a href="/" onClick={handleLogoff} className='ml-4'>Log out</a>
        </IfAuthenticated>

        <IfNotAuthenticated>
          <a href="/" onClick={handleLogin} className='ml-4'>Sign in</a>
        </IfNotAuthenticated>
      </div>
    </nav>
  )
}
