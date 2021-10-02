import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Fruits from './Fruits'
import { cacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'

function App () {
  cacheUser(useAuth0)
  return (
    <Router>
      <Route path='/' component={Nav} />
      <Route exact path='/' component={Fruits} />
    </Router>
  )
}

export default App
