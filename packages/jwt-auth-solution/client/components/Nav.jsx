import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { NavLink, NavGroup } from './Styled'

function Nav() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()
    logout({ returnTo: window.location.origin })
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <>
      <NavGroup>
        <NavLink to="/">Home</NavLink>
        <IfAuthenticated>
          <NavLink to="/" onClick={handleLogOff}>
            Log off
          </NavLink>
          <div>{!isLoading && <>Logged in as {user?.email}</>}</div>
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
