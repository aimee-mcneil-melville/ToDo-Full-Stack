import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

function UpdateSong (props) {
  // const { userSongs} = props

  const userSongs = [
    { id: 1, user_id: 10001, genre: 'Indie Rock', mediaName: 'Hengelo', artist: 'Spring Offensive', link: 'https://open.spotify.com/track/4rqpg85XNApASjAvqjHlb1?si=2bdc00343f3e47f2' },
    { id: 2, user_id: 10001, genre: 'Indie Rock', mediaName: 'By Design', artist: 'Tigercub', link: 'https://open.spotify.com/track/6ICdz2wvVMDC4u801OwHA2?si=8e214d39012c4685' },
    { id: 3, user_id: 10001, genre: 'Indie Rock', mediaName: 'High Strings', artist: 'Noise Punk', link: 'https://open.spotify.com/track/38HaKBYwrqnhrjf9sqJbfc?si=e9bc96d2247c4347' },
    { id: 4, user_id: 10001, genre: 'Funky House', mediaName: 'I look to you (feat. Kimbra)', artist: 'Miami Horror', link: 'https://open.spotify.com/track/0L0GeZL4lyx34nYDzsNuG4?si=a89fdafe24d74899' }
  ]
  const { id } = useParams()

  const song = userSongs.find(song => song.id === Number(id))

  const { mediaName, artist, genre, comment, link } = song
  const [editForm, setEditForm] = useState({
    mediaName,
    artist,
    genre,
    comment,
    link
  })

  function handleChangeEditSong (e) {
    const { name, value } = e.target
    const newEditForm = {
      ...editForm,
      [name]: value
    }
    setEditForm(newEditForm)
  }

  function handleSubmitEditSong (e) {
    // e.preventDefault()
    props.dispatch(UpdateSong(id, editForm))
  }

  return (
    <>
      <h1>Edit song</h1>
      <p>Fill in the details below to add a new song to your list</p>
      {!song &&
      <p>Song doesn&apos;t exist.</p>
      }
      {song &&
      <form onSubmit={handleSubmitEditSong}>
        <label htmlFor="mediaName">Song title* <br />
          <input type="text"
            id='mediaName'
            name='mediaName'
            value={editForm.mediaName}
            onChange={handleChangeEditSong}/>
        </label><br />
        <label htmlFor="artist">Artist* <br />
          <input type="text"
            id='artist'
            name='artist'
            value={editForm.artist}
            onChange={handleChangeEditSong}/>
        </label><br />
        <label htmlFor="genre">Genre <br />
          <input type="text"
            id='genre'
            name='genre'
            value={editForm.genre}
            onChange={handleChangeEditSong}/>
        </label><br />
        <label htmlFor="comment">Comment <br />
          <input type="text"
            id='comment'
            name='comment'
            value={editForm.comment}
            onChange={handleChangeEditSong}/>
        </label><br />
        <label htmlFor="link">Link <br />
          <input type="text"
            id='link'
            name='link'
            value={editForm.link}
            onChange={handleChangeEditSong}/>
        </label><br /><br />
        <button>SAVE</button>
      </form>}
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    userSongs: globalState.userSongs
  }
}

export default connect(mapStateToProps)(UpdateSong)
