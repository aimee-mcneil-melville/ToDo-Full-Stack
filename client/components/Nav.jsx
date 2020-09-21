import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav (props) {
  const currentPage = props.location.pathname
  return (
    <>
      <div>
        <IfAuthenticated>
          <Link to='#' onClick={logOff}>Log out</Link>
          <Link to='/'>Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {currentPage === '/signin' ? <Link to='/register'>Register</Link> : <Link to='/signin'>Sign in</Link>}
          <Link to='/'>Home</Link>
        </IfNotAuthenticated>
      </div>
    </>
  )
}

// if currentPage is signin, show Register link, else show singin link
