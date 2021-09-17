const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./media')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

test('ADD song adds a new song', () => {
  const newSong = { genre: 'hip hop', media_name: 'curtain', artist: 'the wall', link: 'http://www.thewall.com', comment: 'this is rad dude!' }
  return db.addSong(10001, newSong, testDb)
    .then(song => {
      expect(song.media_name).toBe('curtain')
      expect(song.user_id).toBe(10001)
      expect(song.genre).toBe('hip hop')
      return null
    })
})

test('DELETE song deletes the song', () => {
  return db.deleteSong(2, 10001, testDb)
    .then(() => {
      return db.getMedia(10001, testDb)
        .then(songs => {
          expect(songs).toHaveLength(5)
          return null
        })
    })
})

test('UPDATE song updates song', () => {
  const updateSong = { id: 5, user_id: 10001, media_name: 'something new', artist: 'some famous dude' }
  return db.editSong(updateSong, 5, testDb)
    .then((song) => {
      expect(song.media_name).toBe('something new')
      expect(song.artist).toBe('some famous dude')
      return null
    })
})
