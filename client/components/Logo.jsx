import React from 'react'
import { Link } from 'react-router-dom'

const Logo = (props) => {
  return (
    <>
      <div className="logo">
        <Link className='logo__link' to='/'>rcmndr.</Link>
      </div>
    </>
  )
}

export default Logo
