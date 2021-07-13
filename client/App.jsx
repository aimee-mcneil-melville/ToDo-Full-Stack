import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './components/Header'
import Profile from './pages/Profile/Profile'
import Garden from './pages/Garden/Garden'
import Home from './pages/Home/Home'
import AddEvent from './pages/admin/AddEvent/AddEvent'
import EditEvent from './pages/admin/EditEvent/EditEvent'
import Error from './components/Error/Error'
import Event from './pages/Event/Event'

export default function App () {
  const { isAdmin } = useSelector(globalState => globalState.user)

  return (
    <>
      <Error />
      <Header />
      <main className='container'>
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
        <Route
          exact path='/profile'
          render={Profile}
        />
      </section>
    </main>
  )
}
