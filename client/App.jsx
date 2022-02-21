import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { AnimatePresence } from 'framer-motion'

import Header from './components/Header'
import Profile from './pages/Profile/Profile'
import Garden from './pages/Garden/Garden'
import Home from './pages/Home/Home'
import AddEvent from './pages/admin/AddEvent/AddEvent'
import EditEvent from './pages/admin/EditEvent/EditEvent'
import Error from './components/Error/Error'
import Event from './pages/Event/Event'
import Gardens from './pages/Gardens/Gardens'

import { cacheUser } from './auth-utils'

export default function App() {
  const location = useLocation()
  cacheUser(useAuth0)

  return (
    <>
      <Error />
      <Header />
      <main className="container margin-container flex-container centre-flex">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route exact path="/" component={Home} />
            <Route exact path="/gardens" component={Gardens} />
            <Route exact path="/gardens/:id" component={Garden} />
            <Route
              exact
              path="/gardens/:id/events/:eventId"
              component={Event}
            />
            <Route path="/profile" component={Profile} />
            <Route path="/event/new" component={AddEvent} />
            <Route path="/events/:id/edit" component={EditEvent} />
          </Switch>
        </AnimatePresence>
      </main>
    </>
  )
}
