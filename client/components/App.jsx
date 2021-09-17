import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFriends } from './appHelper'

import Icon from './Icon'

// temporary until auth is working
const id = 10001

function App (props) {
  useEffect(() => {
    fetchFriends(props.dispatch, id)
  }, [])
  console.log(props.friends)
  return (
    <>
      <div className='app'>
        <div style={{ display: 'flex' }}>
          <Icon />
          <Icon style="user" />
          <Icon style="delete" />
          <Icon style="edit" />
          <Icon style="play" />
        </div>
        {/* <ErrorMessage /> */}
        <h1>rcmndr</h1>
        {/* <WaitIndicator /> */}
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
