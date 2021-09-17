import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import getUserMedia from '../actions'

function FriendSongs (props) {
  // const {nickname}=props.friend
  const nickname = 'Goku'

  useEffect(() => {
    // props.dispatch(getUserMedia())
  }, [])

  return (
    <>
      <h1>{nickname}</h1>
      <p>click the heart to follow/unfollow</p>
      {!props.friendSongs.length &&
      <p>friend hasn’t added any songs yet</p>}

      {props.friendSongs.map(media => {
        const { id, mediaName, artist, link } = media
        return (
          <li key={id}>
            {link}
            {mediaName}
            {artist}
          </li>
        )
      })}
    </>
  )
}

function mapStateToProps (globalState) {
  return {
    friendSongs: globalState.friendSongs
  }
}

export default connect(mapStateToProps)(FriendSongs)
