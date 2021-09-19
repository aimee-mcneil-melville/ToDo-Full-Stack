import React from 'react'
import { Link } from 'react-router-dom'

function Auth () {
  return (
    <>
      <div>
        collate. <br></br>
        recommend. <br></br>
        discover. <br></br>
        <br></br>
      </div>
      <Link to='/register'>Register</Link>
      <br></br>
      <Link to='/signIn'>Sign In</Link>
    </>
  )
}

export default Auth
