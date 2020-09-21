import React from 'react'
import { Route, Link } from 'react-router-dom'

import Garden from './Garden'
import Home from './Home'
import AddEvent from './AddEvent'

function App () {
  return (
    <>
      <div className="container">
        <h1 className="title">
          <Link to="/">Garde<span>nz</span></Link></h1>   
        <div className='columns'>
          <Route exact path='/' component={ Home } />
          <Route path='/garden' component={ Garden } />
          <Route path='/events/new' component={ AddEvent } /> 
          <Route path='/events/:id/edit' component={ EditEvent } /> 
        </div>
      </div>
    </>
  )
}

export default App
