import React, { useState } from 'react'
import { logOff } from 'authenticare/client'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav () {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <div>
        <a to='/'>Home</a>
        <IfAuthenticated>
          <a to='#' onClick={logOff}>Log out</a>
          <a href='/'>Home</a>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {currentPage==='signIn' ? <a to='/register'>Register</a> : <a to='/signin'>Sign in</a>}
          <a href='/'>Home</a>
        </IfNotAuthenticated>
      </div>

    </>
  )
}

// if currentPage is signin, show Register link, else show singin link
