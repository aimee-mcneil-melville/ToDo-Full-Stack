import React, { useState, useEffect } from "react"
import Nav from './Nav'

function App () {
  return (
    <div className="app">
      <h1>Gardenz</h1>
      <Route path='/register' component={Register} />
      <Route path='/signin' component={SignIn} />
    </div>
  )
}

export default App
