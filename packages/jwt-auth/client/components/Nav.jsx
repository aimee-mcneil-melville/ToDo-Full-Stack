import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

const NavGroup = styled.nav`
  float: right;
`

const NavLink = styled(Link)`
  margin-right: 30px;
`

function Nav() {
  // TODO: call the useAuth0 hook and destructure logout and loginWithRedirect
  function handleLogoff(e) {
    e.preventDefault()
    console.log('log off')
  }

  function handleRegister(e) {
    e.preventDefault()
    console.log('register')
  }

  function handleSignIn(e) {
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
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavLink to="/" onClick={handleRegister}>
            Register
          </NavLink>
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
