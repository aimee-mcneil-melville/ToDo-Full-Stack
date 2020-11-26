import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthenticated, getDecodedToken } from 'authenticare/client'

import { setUser } from '../actions/user'

import Header from './Header'
import Register from './Register'
import SignIn from './SignIn'
import Garden from './Garden'
import Home from './Home'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'

class App extends React.Component {
  componentDidMount () {
    if (isAuthenticated()) {
      const { username, isAdmin, gardenId } = getDecodedToken()
      this.props.dispatch(setUser({ username, isAdmin, gardenId }))
    }
  }

  render () {
    return (
      <main className="container">
        <Route path="/" component={Header} />
        <Route exact path='/' component={Home} />
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
