import React from 'react'
import { Link, Route } from 'react-router-dom'

import Nav from './Nav'

export default function Header () {
  return (
    <header className="columns py-5">
      <h1 className="logo column">
        <Link to="/">Garde<span>nz</span></Link>
      </h1>
      <Route path="/" component={Nav} />
    </header>
  )
}
