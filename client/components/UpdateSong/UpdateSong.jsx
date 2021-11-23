import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

function UpdateSong (props) {
  const { id } = useParams()

  const song = props.userSongs.find(song => song.id === Number(id))

  const { mediaName, artist, genre, comment, link } = song || {} // comment related functionality to be removed //

  const [editForm, setEditForm] = useState({
    mediaName,
    artist,
    genre,
    comment, // comment related functionality to be removed //
    link
  })

  function handleChange (e) {
    const { name, value } = e.target
    const newEditForm = {
      ...editForm,
      [name]: value
    }
    setEditForm(newEditForm)
  }

  function handleSubmit (e) {
    // e.preventDefault()
    props.dispatch(UpdateSong(id, editForm))
  }

  return (
    <>
      <h1>Edit song</h1>
      <p>Fill in the details below to add a new song to your list</p>
      {!song &&
        <p>Song does not exist.</p>
      }
      {song &&
        <form onSubmit={handleSubmit}>
          <label htmlFor="mediaName">Song title*
            <input type="text"
              id='mediaName'
              name='mediaName'
              value={editForm.mediaName}
              onChange={handleChange}/>
          </label><br />
          <label htmlFor="artist">Artist*
            <input type="text"
              id='artist'
              name='artist'
              value={editForm.artist}
              onChange={handleChange}/>
          </label><br />
          <label htmlFor="genre">Genre
            <input type="text"
              id='genre'
              name='genre'
              value={editForm.genre}
              onChange={handleChange}/>
          </label><br />
          {/* comment related functionality to be removed */}
          <label htmlFor="comment">Comment
            <input type="text"
              id='comment'
              name='comment'
              value={editForm.comment}
              onChange={handleChange}/>
          </label><br />
          {/* comment related functionality to be removed */}
          <label htmlFor="link">Link
            <input type="text"
              id='link'
              name='link'
              value={editForm.link}
              onChange={handleChange}/>
          </label>
          <button>SAVE</button>
        </form>
      }
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    userSongs: globalState.userSongs
  }
}

export default connect(mapStateToProps)(UpdateSong)
