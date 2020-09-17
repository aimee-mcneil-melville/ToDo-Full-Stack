import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
const Garden = null // replace with <Garden> import

function App () {
  return (
    <div className='app'>
      <h1>Gardenz</h1>
      {/* route for home page */}
      <Route exact path='/' component={ Home } />
      {/* route for garden page */}
      <Route path='/garden' component={ Garden } />
    </div>
  )
}

export default App
