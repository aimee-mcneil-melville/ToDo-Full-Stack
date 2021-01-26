import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Register from './pages/auth/Register'
import SignIn from './pages/auth/SignIn'
import Garden from './pages/Garden'
import Home from './pages/Home'
import AddEvent from './pages/admin/AddEvent'
import EditEvent from './pages/admin/EditEvent'
import Error from './components/Error'
import WaitIndicator from './components/WaitIndicator'

export default function App () {
  return (
    <main className="container is-max-desktop">
      <Error />
      <Route path="/" component={Header} />
      <WaitIndicator />
      <div className="columns">
        <Route exact path='/' component={Home} />
      </div>
      <div className='columns'>
        <Route path="/register" component={Register} />
        <Route path="/signin" component={SignIn} />
        <Route path='/garden' component={Garden} />
        <Route path='/events/new' component={AddEvent} />
        <Route path='/events/:id/edit' component={EditEvent} />
      </div>
    </main>
  )
}
