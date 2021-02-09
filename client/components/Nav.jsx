import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

// TODO: implement or import a proper logOff function
const logOff = () => {}

const NavGroup = styled.nav`
  float: right;
`

const NavLink = styled(Link)`
  margin-right: 30px;
`

function Nav () {
  return (
    <>
      <NavGroup>
        <NavLink to='/'>Home</NavLink>
        <IfAuthenticated>
          <NavLink to='#' onClick={logOff}>Log off</NavLink>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/signin'>Sign in</NavLink>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Fruit FTW!</h1>
    </>
  )
}

export default Nav
