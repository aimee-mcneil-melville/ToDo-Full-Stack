import React from 'react'
import { Route, Link } from 'react-router-dom'

import Events from './Events'
import Home from './Home'
import Garden from './Garden'
import AddNewEvent from './AddNewEvent'

function App () {
  return (
    <>
    <div className='container'>
      <h1><Link to="/">Gardenz</Link></h1>
      {/* route for home page */}
      <Route exact path='/' component={ Home } />
      {/* route for garden page */}
      <Route path='/garden' component={ Garden } />
      <Events />
      <Route path='/addNewEvent' component={ AddNewEvent } />
    </div>
    </>
  )
}

export default App
