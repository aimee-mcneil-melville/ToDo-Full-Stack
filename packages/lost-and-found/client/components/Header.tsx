import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function Header() {
  const { loginWithRedirect, logout, user } = useAuth0()

  return (
    <header className="hero is-small is-primary">
      <div className="hero-body has-text-centered">
        <div>
          <Link to="/" className="">
            <h1 className="title is-1">Lost and Found</h1>
          </Link>
          <IfAuthenticated>
            <p className="subtitle">{user?.nickname}</p>
          </IfAuthenticated>
        </div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-end">
              <IfAuthenticated>
                <button className="button is-primary" onClick={() => logout()}>
                  Logout
                </button>
              </IfAuthenticated>
              <IfNotAuthenticated>
                <button
                  className="button is-primary"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </button>
              </IfNotAuthenticated>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
