import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFriends } from './appHelper'
import Register from './Register'
import Login from './Login'

import { Route } from 'react-router-dom'

// temporary until auth is working
const id = 10001

function App (props) {
  // function handleRegister ()

  useEffect(() => {
    fetchFriends(props.dispatch, id)
  }, [])
  console.log(props.friends)
  return (
    <>
      <div className='app'>
        {/* <ErrorMessage /> */}
        <h1>rcmndr</h1>
        {/* <WaitIndicator /> */}
        <Register />
        {/* <Route path='/Login' component={Login} /> */}
        <p>Friends List:</p>
        <ul>
          {props.friends.map(friend => (
            <li key={friend}>{friend.name} {friend.lastName}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
const mapStateToProps = (globalState) => {
  return {
    friends: globalState.friends
  }
}

export default connect(mapStateToProps)(App)
