import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { setSongs } from '../../actions'

import Icon from '../Icon/Icon'
import DataRowText from '../DataRow/DataRowText'
import Button from '../Button/Button'

function Songs (props) {
  const history = useHistory()
  const userId = 10001
  // const { nickname } = props.user
  const nickname = 'superman'
  const { songs } = props

  useEffect(() => {
    props.dispatch(setSongs(userId))
  }, [])

  return (
    <>
      <h1>{nickname}</h1>
      <p>These are the tracks you are currently recommending</p>

      {songs.map(song => {
        const { id, mediaName, artist, link } = song
        return (
          <div className='data-row' key={id}>
            {link
              ? <a href={link}><Icon style='play' /></a>
              : <Icon />
            }
            <DataRowText title={mediaName} subtitle={artist} />
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
    songs: globalState.userSongs,
    user: globalState.user
  }
}

export default connect(mapStateToProps)(Songs)
