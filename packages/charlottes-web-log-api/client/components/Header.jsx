import React from 'react'

import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header">
      <h1 className="brand-title">Charlotte&rsquo;s Web Log</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="pure-button">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/posts/new" className="pure-button">
              Add Post
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
