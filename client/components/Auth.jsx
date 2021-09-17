import React from 'react'
import { Link } from 'react-router-dom'

function Auth () {
  return (
    <>
      <div>
        Collate. <br></br>
        Recommend. <br></br>
        Discover. <br></br>
        <br></br>
      </div>
      <Link to='/register'>Register</Link>
      <br></br>
      <Link to='/login'>Login</Link>
    </>
  )
}

export default Auth
