import React from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthenticated, getDecodedToken } from 'authenticare/client'

import { setUser } from '../actions/user'

import Nav from './Nav'
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
        <header>
          <h1 className="title"><Link to="/">Garde<span>nz</span></Link></h1>
          <Route path="/" component={Nav} />
        </header>
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
