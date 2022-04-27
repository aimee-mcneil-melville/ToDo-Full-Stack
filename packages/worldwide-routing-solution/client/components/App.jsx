import React from 'react'
import { Route } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Continent from './Continent'
import Country from './Country'

function App () {
  return (
    <>
      <div className='title'>
        <img src='/images/color_earth.gif' />
        <h1>Navigating the worldwide routes</h1>
      </div>
      {/* This 'main' div is only for styling (so we can use flexbox) */}
      <div className='main'>
        <Route path='/' component={Nav} />
        <Route exact path='/' component={Home} />
        <Route exact path='/continent/:name' component={Continent} />
        <Route path='/continent/:name/:code' component={Country} />
      </div>
    </>
  )
}

export default App
