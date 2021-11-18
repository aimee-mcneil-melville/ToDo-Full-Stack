import React, { useState } from 'react'
import { connect } from 'react-redux'

function AddSong (props) {
  const [songForm, setSongForm] = useState({
    songTitle: '',
    artist: '',
    genre: '',
    comment: '',
    link: ''
  })
  const { songTitle, artist, genre, comment, link } = songForm

  function handleChange (e) {
    const { name, value } = e.target
    const newSongForm = {
      ...songForm,
      [name]: value
    }
    setSongForm(newSongForm)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.history.push('/songs')
  }

  return (
    <>
      <h1>Add new song</h1>
      <p>fill in the details below to add a new song to your list</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="songTitle">
          Song title *
          <input type="text"
            id="songTitle"
            name="songTitle"
            value={songTitle}
            placeholder="The full title of the song"
            onChange={handleChange} />
        </label>
        <label htmlFor="artist">
          Artist *
          <input type="text"
            id="artist"
            name="artist"
            value={artist}
            placeholder="Name of the artist / singer/ group"
            onChange={handleChange} />
        </label>
        <label htmlFor="genre">
          Genre
          <input type="text"
            id="genre"
            name="genre"
            value={genre}
            placeholder="Genre of music (optional)"
            onChange={handleChange} />
        </label>
        <label htmlFor="comment">
          Comment
          <input type="text"
            id="comment"
            name="comment"
            value={comment}
            placeholder="Your thoughts on this track (optional)"
            onChange={handleChange} />
        </label>
        <label htmlFor="link">
          Link
          <input type="text"
            id="link"
            name="link"
            value={link}
            placeholder="A link so others can listen (optional)"
            onChange={handleChange} />
        </label>
        <button>Save</button>
      </form>
    </>
  )
}

export default connect()(AddSong)
