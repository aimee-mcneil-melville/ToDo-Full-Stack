import React, { useState } from 'react'

import Logo from './Logo'
import Nav from './Nav'

const Header = () => {
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  return (
    <header className='app-header'>
      <Logo />
      <button className='app-header__nav-toggle' onClick={toggleNav}><span className={`fa fa-${navOpen ? 'times' : 'bars'}`}></span></button>
      <nav className={`nav${navOpen ? ' nav--open' : ''}`} onClick={toggleNav}><Nav /></nav>
    </header>
  )
}

export default Header
