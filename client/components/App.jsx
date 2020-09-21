import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { AppContext } from './App.context'

import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'

function App () {
  const [currentPage, setCurrentPage] = useState('home')
  const value = {currentPage, setCurrentPage }

  useEffect(() => {
    setCurrentPage('home')
  }, [])

  return (
    <AppContext.Provider value={value}>
      <div className="app">
        <h1>Gardenz</h1>
        <Route path='/' component={Nav}/>
        <Route path='/register' component={Register}/>
        <Route path='/signin' component={SignIn}/>
      </div>
    </AppContext.Provider>
  )
}

export default App
