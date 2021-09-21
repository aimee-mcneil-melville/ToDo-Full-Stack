import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from '../auth-utils'
import { IfAuthenticated } from './Authenticated'
// const id = 10001
const inviteCode = '111A11'

function Nav () {
  return (
    <ul className='main-nav'>
      <li className='main-nav__item'><Link to='/songs'>My tracks</Link></li>
      <li className='main-nav__item'><Link to={'/friends'}>My friends</Link></li>
      <li className='main-nav__item'><Link to={'/profile'}>Edit my profile</Link></li>
      <li className='main-nav__item'>My code: {inviteCode}</li>
      <IfAuthenticated>
        <li className='main-nav__item'><Link to='/' onClick={logOff}>Log Out</Link></li>
      </IfAuthenticated>
    </ul>

  )
}

export default Nav
