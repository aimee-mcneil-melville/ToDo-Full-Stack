import React from 'react'
import { Link, Route } from 'react-router-dom'

import Nav from './Nav'

function Header () {
  return (
    <header className="columns">
      <h1 className="logo column">
        <Link to="/">Garde<span>nz</span></Link>
      </h1>
      <Route path="/" component={Nav} />
    </header>
  )
}

export default Header
