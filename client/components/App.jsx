import React from 'react'
import { Route, Link } from 'react-router-dom'

import Garden from './Garden'
import Home from './Home'
import EventForm from './EventForm'

function App () {
  return (
    <>
      <div className="container">
        <h1 className="title">
          <Link to="/">Garde<span>nz</span></Link></h1>   
        <div className='columns'>
          <Route exact path='/' component={ Home } />
          <Route path='/garden' component={ Garden } />
          <Route path='/event-details' component={ EventForm } />      
        </div>
      </div>
    </>
  )
}

export default App
