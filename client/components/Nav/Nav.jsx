import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logOut, getLinks } from './navHelper'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated/Authenticated'

// React-Icons Import
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'

export default function Nav () {
  const location = useLocation()
  const navLinks = getLinks(location.pathname)
  const user = useSelector(globalState => globalState.user)

  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <nav className="nav" >
      {open && <div className='nav-menu-toggle' onClick={toggleMenu}>
        <IfAuthenticated>
          <Link to={`/gardens/${user.gardenId}`} className='nav-link'>My Garden</Link>
          <Link to="/" onClick={logOut} className='nav-link'>
              Log out
          </Link>
          <Link to="/" className='nav-link'>Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {navLinks.map(({ to, name }) => (
            <Link key={to} to={to} className='nav-link'>
              {name}
            </Link>
          ))}
        </IfNotAuthenticated>
        <div className='close-btn' onClick={toggleMenu} ><IoClose/></div>
      </div>
      }
      {!open && <div className='nav-menu'>
        <IfAuthenticated>
          <Link to={`/gardens/${user.gardenId}`} className='nav-link'>My Garden</Link>
          <Link to="/" onClick={logOut} className='nav-link'>
              Log out
          </Link>
          <Link to="/" className='nav-link'>Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {navLinks.map(({ to, name }) => (
            <Link key={to} to={to} className='nav-link'>
              {name}
            </Link>
          ))}
        </IfNotAuthenticated>
        <div className='hamburger' onClick={toggleMenu} ><GiHamburgerMenu/></div>
      </div>
      }
    </nav>
  )
}
