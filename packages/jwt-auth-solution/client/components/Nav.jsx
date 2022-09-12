import React from 'react'
import { useSelector } from 'react-redux'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { NavLink, NavGroup } from './Styled'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const user = useSelector((state) => state.loggedInUser)
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    })
  }

  return (
    <>
      <NavGroup>
        <NavLink to="/">Home</NavLink>
        <IfAuthenticated>
          <NavLink to="/" onClick={handleLogOff}>
            Log off
          </NavLink>
          <p>
            <span role="img" alt={user.icon}>
              {user.icon}
            </span>
            {' ' + user.username}
          </p>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavLink to="/" onClick={handleSignIn}>
            Sign In
          </NavLink>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Fruit FTW!</h1>
    </>
  )
}

export default Nav
