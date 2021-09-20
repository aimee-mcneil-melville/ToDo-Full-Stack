import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from './Icon'
// import getUserSongs from '../actions'

function Songs (props) {
  // const { nickname } = props.user
  const nickname = 'superman'

  useEffect(() => {
    // props.dispatch(getUserSongs())
  }, [])

  return (
    <>
      <h1>{nickname}</h1>
      <p>These are the tracks you have been recommended</p>

      {props.userSongs.map(song => {
        const { id, mediaName, artist, link } = song
        return (
          <li key={id}>
            {link}
            {mediaName}
            {artist}
            <Link to={`/songs/update/${id}`}>
              <Icon style='edit'/>
            </Link>
            <Icon style='delete'/>
          </li>
        )
      }
      )}

      <button>ADD A NEW TRACK</button>
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    userSongs: globalState.userSongs,
    user: globalState.user
  }
}

export default connect(mapStateToProps)(Songs)
