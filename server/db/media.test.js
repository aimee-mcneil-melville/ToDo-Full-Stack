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
