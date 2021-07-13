import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import {
  IfAuthenticated,
  IfNotAuthenticated
} from '../Authenticated/Authenticated'
import {
  getLoginFn,
  getLogoutFn,
  getRegisterFn
} from '../../auth-utils'

export default function Nav () {
  const login = getLoginFn(useAuth0)
  const logout = getLogoutFn(useAuth0)
  const register = getRegisterFn(useAuth0)
  const gardenId = useSelector(globalState => globalState.user?.gardenId)

  function handleRegister (event) {
    event.preventDefault()
    register()
  }

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
        <Link to="/" className=''>Home</Link>

        <IfAuthenticated>
          <Link to={`/gardens/${gardenId}`} className=''>My Garden</Link>
          <Link to="/profile" className=''>My Profile</Link>
          <a href="/" onClick={handleLogoff} className=''>Log out</a>
        </IfAuthenticated>

        <IfNotAuthenticated>
          <a href="/" onClick={handleLogin} className=''>Sign in</a>
          <a href="/" onClick={handleRegister} className=''>Register</a>
        </IfNotAuthenticated>
      </div>
    </nav>
  )
}
