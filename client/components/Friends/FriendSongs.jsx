import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setCurrentFriendSongs } from '../../actions'

import DataRowText from '../DataRow/DataRowText'
import Icon from '../Icon/Icon'

function FriendSongs (props) {
  const nickname = props.friend.nickname
  const friendSongs = props.friendSongs

  useEffect(() => {
    setCurrentFriendSongs(props.dispatch, props.friend.id)
  }, [])

  return (
    <>
      <h1>{nickname}</h1>
      <p>click the heart to follow/unfollow</p>
      {!friendSongs.length &&
      <p>friend hasn’t added any songs yet</p>}

      {friendSongs.map(media => {
        const { id, mediaName, artist, link } = media
        return (
          <div className='data-row' key={id}>
            {link
              ? <a href={link}><Icon style='play' /></a>
              : <Icon />
            }
            <DataRowText title={mediaName} subtitle={artist} />
          </div>
        )
      })}
    </>
  )
}

function mapStateToProps (globalState) {
  return {
    friendSongs: globalState.currentFriendSongs,
    friend: globalState.currentFriend
  }
}

export default connect(mapStateToProps)(FriendSongs)
