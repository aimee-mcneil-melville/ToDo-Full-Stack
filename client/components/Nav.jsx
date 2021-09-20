import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
const id = 10001
const inviteCode = '111A11'

function Nav () {
  return (
    <>
      <p>InviteCode: {inviteCode}</p>
      <Link to={`/media/${id}`}>My tracks</Link><br />
      <Link to={'/friends'}>My friends</Link><br />
      {/* <Link to={'/profile'}>Edit my profile</Link><br /> */}
      <p>My code: {inviteCode}</p>
      <IfAuthenticated>
        <Link to={'/'} onClick={logOff}>Log Out</Link>
      </IfAuthenticated>
    </>
  )
}

export default Nav
