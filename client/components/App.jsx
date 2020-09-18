import React from 'react'
import { Route } from 'react-router-dom'

import Garden from './Garden'
import Home from './Home'
import Map from './Map'

function App () {
  return (
    <div className='container'>
      <h1>Gardenz</h1>
      <Route exact path='/' component={ Home } />
      <Route path='/garden' component={ Garden } />
      <Map/>
    </div>
  )
}

export default App
