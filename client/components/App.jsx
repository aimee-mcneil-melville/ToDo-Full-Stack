import React from 'react'
import { Route } from 'react-router-dom'

import Garden from './Garden'
import Home from './Home'
import Map from './Map'

function App () {
  return (
    <div className="container">
      <h1 className="title">Garde<span>nz</span></h1>
      <div className='columns'>
        <Route exact path='/' component={ Home } />
        <Route path='/garden' component={ Garden } />
      </div>
    </div>
  )
}

export default App
