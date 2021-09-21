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
    <>
      <IfAuthenticated>
        {user.name}
        <a href='/' onClick={handleLogoff} className='nav-link'>Log out</a>
      </IfAuthenticated>

      <IfNotAuthenticated>
        <a href='/' onClick={handleLogin} className='nav-link'>Sign in</a>
        <a href='/register' onClick={handleRegister} className='nav-link'>Register</a>
      </IfNotAuthenticated>
    </>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Nav)
