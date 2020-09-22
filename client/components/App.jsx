import React, { useEffect, useContext } from 'react'
import { Route } from 'react-router-dom'
import { isAuthenticated } from 'authenticare/client'

import { UserContext, updateUserContext } from './UserContext'
import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'

function App () {
  const [, setUser] = useContext(UserContext)

  useEffect(() => {
    if (isAuthenticated()) {
      updateUserContext(setUser)
    }
  }, [])

  return (
    <div className="app">
      <h1>Gardenz</h1>
      <Route path="/" component={Nav} />
      <Route path="/register" component={Register} />
      <Route path="/signin" component={SignIn} />
    </div>
  )
}

export default App
