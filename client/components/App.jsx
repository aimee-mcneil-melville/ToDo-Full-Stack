import React from 'react'
import { Route } from 'react-router-dom'
import { ProfileProvider } from './ProfileContext'

import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'
import Garden from './Garden'

function App() {
  return (
    <ProfileProvider>
      <div className="app">
        <h1>Gardenz</h1>
        <Route path='/register' component={Register} />
        <Route path='/signin' component={SignIn} />
      </div>
    </ProfileProvider>
  )
}

export default App
