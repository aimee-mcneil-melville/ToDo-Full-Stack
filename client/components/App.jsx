import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { setUser } from '../actions/user'
import { isAuthenticated, getDecodedToken } from '../auth'

import Header from './Header'
import Register from './Register'
import SignIn from './SignIn'
import Garden from './Garden'
import Home from './Home'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'
import Error from './Error'
import WaitIndicator from './WaitIndicator'

class App extends React.Component {
  componentDidMount () {
    if (isAuthenticated()) {
      const { username, isAdmin, gardenId } = getDecodedToken()
      this.props.dispatch(setUser({ username, isAdmin, gardenId }))
    }
  }

  render () {
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
}

export default connect()(App)
