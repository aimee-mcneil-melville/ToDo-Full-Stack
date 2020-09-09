import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className='nav'>
      <Link to='/'>Shop</Link>
      <Link to='/cart'>Cart</Link>
      <Link to='/orders'>My Orders</Link>
    </div>
    <h1>
      <span className='fa fa-leaf' aria-hidden='true' />
      {' '}Sweet As Organics{' '}
      <span className='fa fa-leaf' aria-hidden='true' />
    </h1>
    </>
  )
}

export default Header
