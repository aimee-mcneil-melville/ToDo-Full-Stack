import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from 'react-icons/gi'
import { logOut, getLinks } from './navHelper'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated/Authenticated'

export default function Nav () {
  const location = useLocation()
  const navLinks = getLinks(location.pathname)
  const user = useSelector(globalState => globalState.user)

  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <nav className="navi" onClick={toggleMenu}>
      {open && <div className='navi-toggle'>
        <IfAuthenticated>
          <Link to={`/gardens/${user.gardenId}`} className='navi-link'>My Garden</Link>
          <Link to="/" onClick={logOut} className='navi-link'>
              Log out
          </Link>
          <Link to="/" className='navi-link'>Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {navLinks.map(({ to, name }) => (
            <Link key={to} to={to} className='navi-link'>
              {name}
            </Link>
          ))}
        </IfNotAuthenticated>
        <div className='hamburger' onClick={toggleMenu} ><GiHamburgerMenu/></div>
      </div>
      }
      <div className='navi-item'>
        <IfAuthenticated>
          <Link to={`/gardens/${user.gardenId}`} className='navi-link'>My Garden</Link>
          <Link to="/" onClick={logOut} className='navi-link'>
              Log out
          </Link>
          <Link to="/" className='navi-link'>Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {navLinks.map(({ to, name }) => (
            <Link key={to} to={to} className='navi-link'>
              {name}
            </Link>
          ))}
        </IfNotAuthenticated>
        <div className='hamburger' onClick={toggleMenu} ><GiHamburgerMenu/></div>
      </div>
    </nav>
  )
}
