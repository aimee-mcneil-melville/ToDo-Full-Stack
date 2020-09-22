import React, { useEffect, useContext } from 'react'
import { Link, Route } from 'react-router-dom'
import { isAuthenticated } from 'authenticare/client'

import { UserContext, updateUserContext } from './UserContext'
import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'
import Garden from './Garden'
import Home from './Home'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'

function App () {
  const [, setUser] = useContext(UserContext)

  useEffect(() => {
    if (isAuthenticated()) {
      updateUserContext(setUser)
    }
  }, [])

  return (
    <>
      <div className="container">
        <h1 className="title">
          <Link to="/">Garde<span>nz</span></Link></h1>
        <div className='columns'>
          <Route exact path='/' component={ Home } />
          <Route path="/" component={Nav} />
          <Route path="/register" component={Register} />
          <Route path="/signin" component={SignIn} />
          <Route path='/garden' component={ Garden } />
          <Route path='/events/new' component={ AddEvent } />
          <Route path='/events/:id/edit' component={ EditEvent } />
        </div>
      </div>
    </>
  )
}

export default App
