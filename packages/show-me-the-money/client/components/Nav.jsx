import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logoutUser } from '../actions/auth'

function Nav() {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((redux) => redux.auth)

  const [burgerVisible, setBurgerVisible] = useState(false)

  const toggleBurger = () => {
    setBurgerVisible((currentBurgerState) => !currentBurgerState)
  }
  const logout = () => {
    const confirmSuccess = () => navigateTo('/')
    dispatch(logoutUser(confirmSuccess))
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span
            onClick={toggleBurger}
            className={`navbar-burger burger ${
              burgerVisible ? 'is-active' : ''
            }`}
            data-target="navbarMenuHeroA"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div
          id="navbarMenuHeroA"
          className={`navbar-menu ${burgerVisible ? 'is-active' : ''}`}
        >
          <div className="navbar-end">
            {auth.isAuthenticated ? (
              <Link
                to="/"
                className="navbar-item is-large"
                onClick={() => logout()}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  onClick={toggleBurger}
                  className="navbar-item is-large"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  onClick={toggleBurger}
                  className="navbar-item"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
