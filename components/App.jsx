import React from 'react'
import {Switch, Route} from 'react-router'

import Items from './components/Items'
import SimpleItems from './components/SimpleItems'

const App = ({children}) => (
  <div className="container">
    <Switch>
      <Route path='/' component={Items} />
      <Route path='/simple' component={SimpleItems} />
    </Switch>
  </div>
)

export default App
