import React from 'react'
import { connect } from 'react-redux'
import FriendSongs from './FriendSongs'

function Media (props) {
  const { nickname } = props
  return (
    <>
      <h1>{ nickname }</h1>
      <p>These are the tracks you have been recommended</p>
      {props.mysongs.map( song => 
        <li key={}><FriendSongs {...song}/></li>
       )}
      
      <button>ADD A NEW TRACK</button>
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    friendSongs: globalState.friendSongs
  }
}

export default connect(mapStateToProps)(Media)