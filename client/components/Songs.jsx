import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import DataTextRow from './DataTextRow'
import Button from './Button'
// import getUserSongs from '../actions'

function Songs (props) {
  const history = useHistory()

  // const { nickname } = props.user
  const nickname = 'superman'

  const userSongs = [
    { id: 1, user_id: 10001, genre: 'Indie Rock', mediaName: 'Hengelo', artist: 'Spring Offensive', link: 'https://open.spotify.com/track/4rqpg85XNApASjAvqjHlb1?si=2bdc00343f3e47f2' },
    { id: 2, user_id: 10001, genre: 'Indie Rock', mediaName: 'By Design', artist: 'Tigercub', link: 'https://open.spotify.com/track/6ICdz2wvVMDC4u801OwHA2?si=8e214d39012c4685' },
    { id: 3, user_id: 10001, genre: 'Indie Rock', mediaName: 'High Strings', artist: 'Noise Punk', link: 'https://open.spotify.com/track/38HaKBYwrqnhrjf9sqJbfc?si=e9bc96d2247c4347' },
    { id: 4, user_id: 10001, genre: 'Funky House', mediaName: 'I look to you (feat. Kimbra)', artist: 'Miami Horror', link: '' }
  ]

  useEffect(() => {
    // props.dispatch(getUserSongs())
  }, [])

  return (
    <>
      <h1>{nickname}</h1>
      <p>These are the tracks you are currently recommending</p>

      {userSongs.map(song => {
        const { id, mediaName, artist, link } = song
        return (
          <div className='data-row' key={id}>
            {link
              ? <a href={link}><Icon style='play' /></a>
              : <Icon />
            }
            <DataTextRow title={mediaName} subtitle={artist} />
            <Link to={`/songs/update/${id}`}>
              <Icon style='edit'/>
            </Link>
            <Icon style='delete'/>
          </div>
        )
      })}
      <Button buttonText='Add a new track' clickFunction={() => history.push('/songs/add')} />
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
