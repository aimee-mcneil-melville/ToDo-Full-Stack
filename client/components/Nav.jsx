import React from 'react'
import { Link } from 'react-router-dom'
const inviteCode = '111A11'

function Nav () {
  return (
    <ul className='main-nav'>
      <li className='main-nav__item'><Link to='/songs'>My tracks</Link></li>
      <li className='main-nav__item'><Link to={'/friends'}>My friends</Link></li>
      <li className='main-nav__item'><Link to={'/profile'}>Edit my profile</Link></li>
      <li className='main-nav__item'>My code: {inviteCode}</li>
      <li className='main-nav__item'>Log out</li>
    </ul>
  )
}

export default Nav
