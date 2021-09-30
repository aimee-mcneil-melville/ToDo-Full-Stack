import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Fruits from './Fruits'

function App () {
  return (
    <Router>
      <Route path='/' component={Nav} />
      <Route exact path='/' component={Fruits} />
    </Router>
  )
}

export default App
