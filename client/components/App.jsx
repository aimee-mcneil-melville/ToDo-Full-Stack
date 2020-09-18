import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
const Garden = null // replace with <Garden> import

import Events from './Events'

function App () {
  return (
    <div className='container'>
      <h1>Gardenz</h1>
      {/* route for home page */}
      <Route exact path='/' component={ Home } />
      {/* route for garden page */}
      <Route path='/garden' component={ Garden } />
      <Events />
    </div>
  )
}

export default App
