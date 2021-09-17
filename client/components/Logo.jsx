import React from 'react'
import { Link } from 'react-router-dom'

const Logo = (props) => {
  return (
    <>
      <h1 className="logo">
        <Link className='logo__link' to='/'>rcmndr.</Link>
      </h1>
    </>
  )
}

export default Logo
