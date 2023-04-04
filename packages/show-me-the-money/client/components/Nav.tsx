import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks'
import { logoutUser } from '../actions/auth'

function Nav() {
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((redux) => redux.auth)

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
