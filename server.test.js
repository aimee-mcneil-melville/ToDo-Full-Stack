const request = require('supertest')
const cheerio = require('cheerio')

const db = require('./db')
const server = require('./server')

jest.mock('./db', () => ({
  getUsers: jest.fn()
}))

test('GET /', () => {
  db.getUsers.mockImplementation(() => Promise.resolve([
    { id: 2, name: 'test user 2', email: 'test2@user.nz' },
    { id: 4, name: 'test user 4', email: 'test4@user.nz' }
  ]))

  return request(server)
    .get('/')
    .expect(200)
    .then((res) => {
      const $ = cheerio.load(res.text)
      const firstLiText = $('li').first().text()
      return expect(firstLiText).toBe('test user 2 (test2@user.nz)')
    })
    .catch(err => expect(err).toBeNull())
})
