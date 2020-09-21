import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

import { AppContext } from './App.context'

export default function Nav () {
  const { currentPage, setCurrentPage } = useContext(AppContext)

  return (
    <>
      <div>
        <Link to='/'>Home</Link>
        <IfAuthenticated>
          <Link to='#' onClick={logOff}>Log out</Link>
          <Link to='/'>Home</Link>
        </IfAuthenticated>
        {/* <IfNotAuthenticated> */}
          {currentPage==='signIn' ? <Link to='/register'>Register</Link> : <Link to='/signin'>Sign in</Link>}
          <Link to='/'>Home</Link>
        {/* </IfNotAuthenticated> */}
      </div>
    </>
  )
}

// if currentPage is signin, show Register link, else show singin link
