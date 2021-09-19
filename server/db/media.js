const connection = require('./connection')

function getMedia (id = 10001, db = connection) {
  return db('media_list')
    .where('user_id', Number(id))
    .then(result => {
      return result
    })
}

function addSong (userId, song, db = connection) {
  const { genre, media_name: mediaName, artist, link, comment } = song
  const newSong = { user_id: userId, genre, media_name: mediaName, artist, link, comment }
  return db('media_list')
    .insert(newSong)
    // .select('user_id', 'genre', 'media_name', 'artist', 'link', 'comment')
    .then(() => {
      return {
        user_id: newSong.user_id,
        genre: newSong.genre,
        media_name: newSong.media_name,
        artist: newSong.artist,
        link: newSong.link,
        comment: newSong.comment
      }
    })
}

function deleteSong (id, userId, db = connection) {
  return db('media_list')
    .where('user_id', userId)
    .where('id', id)
    .del()
}

function editSong (songDetails, db = connection) {
  const { id, user_id: userId, genre, media_name: mediaName, artist, link, comment } = songDetails
  const editSong = { genre, media_name: mediaName, artist, link, comment }
  return db('media_list')
    .where('id', id)
    .update(editSong)
    .then(() => {
      return {
        id: id,
        user_id: userId,
        genre: editSong.genre,
        media_name: editSong.media_name,
        artist: editSong.artist,
        link: editSong.link,
        comment: editSong.comment
      }
    })
}

module.exports = {
  getMedia,
  addSong,
  deleteSong,
  editSong
}
