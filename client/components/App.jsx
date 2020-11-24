import React from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthenticated, getDecodedToken } from 'authenticare/client'

import { setUser } from '../actions'

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
      const { username, isAdmin, garden_id: gardenId } = getDecodedToken()
      this.props.dispatch(setUser({ username, isAdmin, gardenId }))
    }
  }

  render () {
    return (
      <>
        <div className="container">
          <h1 className="title">
            <Link to="/">Garde<span>nz</span></Link></h1>
          <div className='columns'>
            <Route exact path='/' component={Home} />
            <Route path="/" component={Nav} />
            <Route path="/register" component={Register} />
            <Route path="/signin" component={SignIn} />
            <Route path='/garden' component={Garden} />
            <Route path='/events/new' component={AddEvent} />
            <Route path='/events/:id/edit' component={EditEvent} />
          </div>
        </div>
      </>
    )
  }
}

export default connect()(App)
