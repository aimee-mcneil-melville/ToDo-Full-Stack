import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

const NavGroup = styled.nav`
  float: right;
`

const NavLink = styled(Link)`
  margin-right: 30px;
`

function Nav () {
  const { logout, loginWithRedirect } = useAuth0()
  function handleLogoff (e) {
    e.preventDefault()
    logout()
  }

  function handleRegister (e) {
    e.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/register`
    })
  }
  function handleSignIn (e) {
    e.preventDefault()
    loginWithRedirect()
  }
  return (
    <>
      <NavGroup>
        <NavLink to='/'>Home</NavLink>
        <IfAuthenticated>
          <a href='/' onClick={handleLogoff}>Log off</a>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <a href='/' onClick={handleRegister}>Register</a>
          <a href='/' onClick={handleSignIn}>Sign in</a>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Fruit FTW!</h1>
    </>
  )
}

export default Nav
