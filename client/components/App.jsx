import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { fetchFriends } from './appHelper'

import Auth from './Auth'
import Register from './Register'
import SignIn from './SignIn'

// temporary until auth is working
const id = 10001

function App (props) {
  useEffect(() => {
    fetchFriends(props.dispatch, id)
  }, [])
  console.log(props.friends)
  return (
    <>
      <Router>
        <div className='app'>
          {/* <ErrorMessage /> */}
          <h1>rcmndr</h1>
          {/* <WaitIndicator /> */}

          <Route exact path='/' component={Auth}/>
          <Route path='/register' component={Register}/>
          <Route path='/signIn' component={SignIn}/>
        </div>
      </Router>
    </>
  )
}
const mapStateToProps = (globalState) => {
  return {
    friends: globalState.friends
  }
}

export default connect(mapStateToProps)(App)
