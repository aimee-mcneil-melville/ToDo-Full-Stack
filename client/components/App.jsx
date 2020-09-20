import React from 'react'
import { Route, Link } from 'react-router-dom'

import Garden from './Garden'
import Home from './Home'
import Map from './Map'

function App () {
  return (
    <>
    <div className="container">
      <h1 className="title">
        <Link to="/">Garde<span>nz</span></Link></h1>   
      </div>
      <div className='columns'>
      <Route exact path='/' component={ Home } />
      <Route path='/garden' component={ Garden } />
      {/* <Route path='/addNewEvent' component={ AddNewEvent } /> */}
    </div>
    </>
  )
}

export default App
