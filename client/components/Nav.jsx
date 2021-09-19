import React from 'react'
import { Link } from 'react-router-dom'
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
      <p>Log out: </p>
    </>
  )
}

export default Nav
