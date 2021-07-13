import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import Header from './components/Header'
import Profile from './pages/Profile/Profile'
import Garden from './pages/Garden/Garden'
import Home from './pages/Home/Home'
import AddEvent from './pages/admin/AddEvent/AddEvent'
import EditEvent from './pages/admin/EditEvent/EditEvent'
import Error from './components/Error/Error'
import Event from './pages/Event/Event'

import { cacheUser } from './auth-utils'

export default function App () {
  const { isAdmin } = useSelector(globalState => globalState.user)

  cacheUser(useAuth0)

  return (
    <main className='container p-3'>
      <Error />
      <Header />
      <section className='columns'>
        <Route exact path='/' component={Home} />
        <Route exact path='/gardens/:id' component={Garden} />
        <Route path='/profile' component={Profile} />
        <Route
          path='/event/new'
          render={() => {
            return isAdmin
              ? <AddEvent />
              : <Redirect to='/' />
          }}
        />
        <Route
          path='/events/:id/edit'
          render={() => {
            return isAdmin
              ? <EditEvent />
              : <Redirect to='/' />
          }}
        />
        <Route exact path='/events/:id' component={Event} />
      </section>
    </main>
  )
}
