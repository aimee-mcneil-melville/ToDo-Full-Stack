import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getLoginFn, getLogoutFn, getRegisterFn } from '../auth0-utils'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { connect } from 'react-redux'

function Nav (props) {
  const { user } = props
  const login = getLoginFn(useAuth0)
  const logout = getLogoutFn(useAuth0)
  const register = getRegisterFn(useAuth0)

  function handleLogin (event) {
    event.preventDefault()
    login()
  }

  function handleLogoff (event) {
    event.preventDefault()
    logout()
  }

  function handleRegister (event) {
    event.preventDefault()
    register()
  }

  return (
    <nav>
      <h1 className='logo'>Full-stack Boilerplate with Auth0</h1>
      <section className='nav-item'>
        <IfAuthenticated>
          <p>Hello, {user.name}</p>
          <section className='sign'>
            <a href='/' onClick={handleLogoff} className='nav-link'>Log out</a>
          </section>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {/* <section className='nav-item'> */}
          <p>Hello, guest</p>
          <section className='sign'>
            <a href='/' onClick={handleLogin} className='nav-link'>Sign in</a>
            <a href='/' onClick={handleRegister} className='nav-link'>Register</a>
          </section>
          {/* </section> */}
        </IfNotAuthenticated>
      </section>
    </nav >
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Nav)
