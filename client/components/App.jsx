import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { fetchFruits } from '../actions/fruits'
import { cacheUser, getLoginFn, getLogoutFn } from '../auth0-utils'
import Nav from './Nav'

function App(props) {

  cacheUser(useAuth0)

  useEffect(() => {
    props.dispatch(fetchFruits())
  }, [])

  function handleLogIn() {
    getLoginFn(useAuth0)
  }
  function handleLogOut() {
    getLogoutFn(useAuth0)
  }

  return (
    <nav>
      <div className='app'>
       <Nav /> 
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>
          {props.fruits.map(fruit => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
const mapStateToProps = (globalState) => {
  return {
    fruits: globalState.fruits
  }
}

export default connect(mapStateToProps)(App)
