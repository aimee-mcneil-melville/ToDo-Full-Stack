import React from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { cacheUser } from '../auth0-utils'
import Nav from './Nav'
import PingRoutes from './PingRoutes'
import Registeration from './Registeration'
import Users from './Users'
import { Route } from 'react-router'

function App () {
  cacheUser(useAuth0)

  return (
    <div className='app'>
      <Route exact path='/' component={Nav} />
      <Route exact path='/' component={Users} />
      <Route exact path='/' component={PingRoutes} />
      <Route path='/register' component={Registeration} />
    </div>
  )
}
const mapStateToProps = (globalState) => {
  return {
    fruits: globalState.fruits,
    token: globalState.user.token
  }
}

export default connect(mapStateToProps)(App)
