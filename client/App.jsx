import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import { isAuthenticated } from './auth'

import Header from './components/Header'
// import Register from './pages/auth/Register/Register'
// import SignIn from './pages/auth/SignIn/SignIn'
import Garden from './pages/Garden/Garden'
import Home from './pages/Home/Home'
import AddEvent from './pages/admin/AddEvent/AddEvent'
import EditEvent from './pages/admin/EditEvent/EditEvent'
import Error from './components/Error/Error'
import Event from './pages/Event/Event'

export default function App () {
  function isAuthenticated () {
    return true
  }
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)
  const gardenId = useSelector(globalState => globalState.user.gardenId)

  return (
    <main className='container p-3'>
      <Error />
      <Header />
      <section className='columns'>
        <Route exact path='/' component={Home} />
        <Route exact path='/gardens/:id' component={Garden} />
        <Route
          path='/register'
          render={() => {
            return isAuthenticated()
              ? <Redirect to={`/gardens/${gardenId}`} />
              // : <Register />
              : console.log('nope')
          }}
        />
        <Route
          path='/signin'
          render={() => {
            return isAuthenticated()
              ? <Redirect to={`/gardens/${gardenId}`} />
              // : <SignIn />
              : console.log('nope')
          }}
        />

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
