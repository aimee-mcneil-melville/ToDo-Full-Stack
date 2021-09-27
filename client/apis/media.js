import request from 'superagent'

const rootUrl = '/api/v1/media/getMedia/'

export function getSongs (id) {
  console.log('api')
  return request.get(rootUrl + id)
    .then(res => {
      const songList = res.body.map(song => {
        song.mediaName = song.media_name
        return song
      })
      return songList
    })
}

export function updateSong (updateSongData) {
  return request.patch(rootUrl + updateSongData.id + '/edit')
    .send(updateSongData)
    .then(res => res.body)
}

export function addSong (id, newSongData) {
  return request.post(rootUrl + newSongData.id + '/add')
    .send(id, newSongData)
    .then(res => res.body)
}

export function deleteSong (id) {
  return request.delete(rootUrl + id)
    .then((res) => {
      res.sendStatus(200)
      return null
    })
}
