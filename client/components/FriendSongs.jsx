import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import getUserMedia from '../actions'

import DataRowText from './DataRowText'
import Icon from './Icon'

function FriendSongs (props) {
  // const { friendSongs } = props
  const friendSongs = [
    { id: 1, user_id: 10001, genre: 'Indie Rock', mediaName: 'Hengelo', artist: 'Spring Offensive', link: 'https://open.spotify.com/track/4rqpg85XNApASjAvqjHlb1?si=2bdc00343f3e47f2' },
    { id: 2, user_id: 10001, genre: 'Indie Rock', mediaName: 'By Design', artist: 'Tigercub', link: 'https://open.spotify.com/track/6ICdz2wvVMDC4u801OwHA2?si=8e214d39012c4685' },
    { id: 3, user_id: 10001, genre: 'Indie Rock', mediaName: 'High Strings', artist: 'Noise Punk', link: 'https://open.spotify.com/track/38HaKBYwrqnhrjf9sqJbfc?si=e9bc96d2247c4347' },
    { id: 4, user_id: 10001, genre: 'Funky House', mediaName: 'I look to you (feat. Kimbra)', artist: 'Miami Horror', link: 'https://open.spotify.com/track/0L0GeZL4lyx34nYDzsNuG4?si=a89fdafe24d74899' }
  ]

  // const {nickname}=props.friend
  const nickname = 'Goku'

  useEffect(() => {
    // props.dispatch(getUserMedia())
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
    friendSongs: globalState.friendSongs
  }
}

export default connect(mapStateToProps)(FriendSongs)
