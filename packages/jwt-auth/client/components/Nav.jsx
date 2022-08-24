import React from 'react'
import { useSelector } from 'react-redux'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { NavLink, NavGroup } from './Styled'


function Nav() {
  const user = useSelector((state) => state.loggedInUser)
  // TODO: call the useAuth0 hook and destructure logout and loginWithRedirect

  const handleLogoff = (e) => {
    e.preventDefault()
    console.log('log off')
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    console.log('sign in')
  }

  return (
    <>
      <NavGroup>
        <NavLink to="/">Home</NavLink>
        <IfAuthenticated>
          <NavLink to="/" onClick={handleLogoff}>
            Log off
          </NavLink>
          <p><span role='image' alt={user.icon}>{user.icon}</span> {user.username}</p>
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
