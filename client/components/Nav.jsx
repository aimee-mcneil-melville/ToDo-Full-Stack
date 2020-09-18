import React from 'react'
import { logOff } from 'authenticare/client'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav () {
  return (
    <>
      <div>
        <a to='/'>Home</a>
        <IfAuthenticated>
          <a to='#' onClick={logOff}>Log out</a>
          <a href='/'>Home</a>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <a to='/register'>Register</a>
          <a to='/signin'>Sign in</a>
        </IfNotAuthenticated>
      </div>

    </>
  )
}
