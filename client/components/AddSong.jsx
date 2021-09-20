import React, { useState } from 'react'
import { connect } from 'react-redux'
// import { addSong } from '../actions'

function AddSong (props) {
  const [songForm, setSongForm] = useState({
    songTitle: '',
    artist: '',
    genre: '',
    comment: '',
    link: ''
  })
  const { songTitle, artist, genre, comment, link } = songForm

  function handleChangeAddSong (e) {
    const { name, value } = e.target
    const newSongForm = {
      ...songForm,
      [name]: value
    }
    setSongForm(newSongForm)
  }

  function handleSubmitAddSong (e) {
    e.preventDefault()
    // props.dispatch(addSong(songForm))
  }

  return (
    <>
      <h1>Add new song</h1>
      <p>fill in the details below to add a new song to your list</p>
      <form onSubmit={handleSubmitAddSong}>
        <label htmlFor="songTitle">
          <input type="text"
            id="songTitle"
            name="songTitle"
            value={songTitle}
            placeholder="The full title of the song"
            onChange={handleChangeAddSong} />
        </label>
        <label htmlFor="artist">
          <input type="text"
            id="artist"
            name="artist"
            value={artist}
            placeholder="Name of the artist / singer/ group"
            onChange={handleChangeAddSong} />
        </label>
        <label htmlFor="genre">
          <input type="text"
            id="genre"
            name="genre"
            value={genre}
            placeholder="Genre of music (optional)"
            onChange={handleChangeAddSong} />
        </label>
        <label htmlFor="comment">
          <input type="text"
            id="comment"
            name="comment"
            value={comment}
            placeholder="Your thoughts on this track (optional)"
            onChange={handleChangeAddSong} />
        </label>
        <label htmlFor="link">
          <input type="text"
            id="link"
            name="link"
            value={link}
            placeholder="A link so others can listen (optional)"
            onChange={handleChangeAddSong} />
        </label>
        <button>Save</button>
      </form>
    </>
  )
}

export default connect()(AddSong)
