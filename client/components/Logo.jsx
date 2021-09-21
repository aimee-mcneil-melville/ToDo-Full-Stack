import React from 'react'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

const Logo = (props) => {
  return (
    <>
      <div className="logo">
        <IfAuthenticated>
          <Link className='logo__link' to='/friends'>rcmndr.</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link className='logo__link' to='/'>rcmndr.</Link>
        </IfNotAuthenticated>
      </div>
    </>
  )
}

export default Logo
