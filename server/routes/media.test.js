const request = require('supertest')
const server = require('../server')
const db = require('../db/media')
jest.mock('../db/media')

test('GET /id return all media', () => {
  db.getMedia.mockImplementation(() => {
    return Promise.resolve([
      { id: 1, media_name: 'test song 1', artist: 'test artist 1', link: 'test link 1' },
      { id: 2, media_name: 'test song 2', artist: 'test artist 2', link: 'test link 2' },
      { id: 3, media_name: 'test song 3', artist: 'test artist 3', link: 'test link 3' }
    ])
  })
  return request(server)
    .get('/api/v1/media/getMedia/1')
    .expect(200)
    .then((response) => {
      console.log('MEDIA: ', response.body)
      expect(response.body).toHaveLength(3)
      return null
    })
})

test('PATCH /getMedia updates a song', () => {
  db.editSong = jest.fn()
  db.editSong.mockImplementation(() => {
    return Promise.resolve()
  })
  const songData = {}
  return request(server)
    .patch('/api/v1/media/getMedia/1/edit')
    .send(songData)
    .then((response) => {
      expect(response.status).toBe(200)
      return null
    })
})

test('DELETE /getMedia deletes a song', () => {
  db.deleteSong = jest.fn()
  db.deleteSong.mockImplementation(() => {
    return Promise.resolve()
  })
  return request(server)
    .delete('/api/v1/media/getMedia/1')
    .then((response) => {
      expect(response.status).toBe(200)
      return null
    })
})

test('POST / get single song', () => {
  db.addSong = jest.fn()
  db.addSong.mockImplementation(newSong => {
    return Promise.resolve()
  })
  const newSong = { mediaName: 'song 1', genre: 'pop', artist: 'JB', comment: 'I love this song', link: 'hi (link)' }
  return request(server)
    .post('/api/v1/media/getMedia/1/add')
    .send(newSong)
    .then((response) => {
      expect(response.status).toBe(200)
      return null
    })
})
