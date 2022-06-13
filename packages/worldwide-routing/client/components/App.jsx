import React from 'react'

import Nav from './Nav'
import Home from './Home'

function App() {
  return (
    <>
      <div className="title">
        <img src="/images/color_earth.gif" alt="A coloured globe of the earth spinning around on its axis"/>
        <h1>Navigating the worldwide routes</h1>
      </div>
      {/* This 'main' div is only for styling (so we can use flexbox) */}
      <div className="main">
        <Nav />
        <Home />
      </div>
    </>
  )
}

export default App
