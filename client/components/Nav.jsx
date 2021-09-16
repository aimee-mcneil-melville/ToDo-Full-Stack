import React from 'react'
import { Link } from 'react-router-dom'
const id = 10001
const inviteCode = '111A11'

function Nav () {
  return (
    <>
      <p>InviteCode: {inviteCode}</p>
      <Link to={'/friends'}>Friends</Link>
      <Link to={`Media/${id}`}>{`Media/${id}`}</Link>
    </>
  )
}

export default Nav
