import request from 'superagent'

const rootUrl = '/api/v1/media/getMedia/'

export function getSongs (id) {
  return request.get(rootUrl + id)
    .then(res => {
      return res.body.songs
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
