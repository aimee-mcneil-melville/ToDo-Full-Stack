import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'

import { clearUser } from '../actions/user'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function Nav (props) {
  const currentPage = props.location.pathname
  let navLinks = null

  switch (currentPage) {
    case '/signin':
      navLinks = (
        <>
          <Link to="/register">Register</Link>
          <Link to="/">Home</Link>
        </>
      )
      break
    case '/register':
      navLinks = (
        <>
          <Link to="/signin">Sign in</Link>
          <Link to="/">Home</Link>
        </>
      )
      break
    default:
      navLinks = (
        <>
          <Link to="/signin">Sign in</Link>
          <Link to="/register">Register</Link>
        </>
      )
  }

  const logOut = () => {
    logOff()
    props.dispatch(clearUser())
  }

  return (
    <>
      <div className="nav">
        <IfAuthenticated>
          <Link to="/" onClick={logOut}>
            Log out
          </Link>
          <Link to="/">Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>{navLinks}</IfNotAuthenticated>
      </div>
    </>
  )
}

export default connect()(Nav)
