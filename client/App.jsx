import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { isAuthenticated } from './auth'

import Header from './components/Header'
import Register from './pages/auth/Register'
import SignIn from './pages/auth/SignIn'
import Garden from './pages/Garden'
import Home from './pages/Home'
import AddEvent from './pages/admin/AddEvent'
import EditEvent from './pages/admin/EditEvent'
import Error from './components/Error'
import WaitIndicator from './components/WaitIndicator'
import Event from './pages/Event'

export default function App () {
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)
  const gardenId = useSelector(globalState => globalState.user.gardenId)

  return (
    <main className='container p-3'>
      <Error />
      <Header />
      <WaitIndicator />
      <section className='columns'>
        <Route exact path='/' component={Home} />
        <Route exact path='/gardens/:id' component={Garden} />
        <Route
          path='/register'
          render={() => {
            return isAuthenticated()
              ? <Redirect to={`/gardens/${gardenId}`} />
              : <Register />
          }}
        />
        <Route
          path='/signin'
          render={() => {
            return isAuthenticated()
              ? <Redirect to={`/gardens/${gardenId}`} />
              : <SignIn />
          }}
        />

        <Route path='/gardens'
          render={() => {
            <Redirect from='/' to={`/gardens/${gardenId}`} />
          }}
        />

        <Route
          path='/events/new'
          render={() => {
            return isAdmin
              ? <AddEvent />
              : <Redirect to='/gardens' />
          }}
        />
        <Route
          path='/events/:id/edit'
          render={() => {
            return isAdmin
              ? <EditEvent />
              : <Redirect to='/garden' />
          }}
        />
        <Route exact path='/events/:id' component={Event} />
      </section>
    </main>
  )
}
