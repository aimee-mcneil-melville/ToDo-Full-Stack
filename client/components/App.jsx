import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { combineReducers } from '../reducers'

import { fetchFriends } from './appHelper'

function App (props) {
  useEffect(() => {
    fetchFriends(props.dispatch)
  }, [])
  console.log(props.friends)
  return (
    <>
      <div className='app'>
        {/* <ErrorMessage /> */}
        <h1>rcmndr</h1>
        {/* <WaitIndicator /> */}
        <ul>
          {props.friends.map(friend => (
            <li key={friend.id}>User ID: {friend.user_id}</li>
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
