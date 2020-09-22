import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav(props) {
  let currentPage = props.location.pathname
  let navLinks = null

  switch (currentPage) {
    case '/':
      navLinks = (
        <>
          <Link to="/signin">Sign in</Link>
          <Link to="/register">Register</Link>
        </>
      )
      break
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
  return (
    <>
      <div className="nav">
        <IfAuthenticated>
          <Link to="/" onClick={logOff}>
            Log out
          </Link>
          <Link to="/">Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>{navLinks}</IfNotAuthenticated>
      </div>
    </>
  )
}
