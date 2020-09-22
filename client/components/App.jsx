import React from 'react'
import { Route } from 'react-router-dom'
import { UserProvider } from './UserContext'
import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'
import Garden from './Garden'

function App() {
  return (
    <div className="app">
      <UserProvider>
        <h1>Gardenz</h1>
        <Route path="/" component={Nav} />
        <Route path="/register" component={Register} />
        <Route path="/signin" component={SignIn} />
        <Route path="/garden" component={Garden} />
      </UserProvider>
    </div>
  )
}

export default App
