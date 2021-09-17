import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import getUserMedia from '../actions'

function Media (props) {
  // const { nickname } = props.user
  const nickname = 'superman'

  useEffect(() => {
    // props.dispatch(getUserMedia())
  }, [])

  return (
    <>
      <h1>{nickname}</h1>
      <p>These are the tracks you have been recommended</p>

      {props.userMedia.map(media => {
        const { id, mediaName, artist, link } = media
        return (
          <li key={id}>
            {link}
            {mediaName}
            {artist}
            <button>edit</button>
            <button>X</button>
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
    userMedia: globalState.userMedia,
    user: globalState.user
  }
}

export default connect(mapStateToProps)(Media)
