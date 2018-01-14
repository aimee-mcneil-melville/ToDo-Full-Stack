const cheerio = require('cheerio')
const request = require('supertest')

const app = require('../server')
const db = require('../db')

test('GET /?showlist=true shows a list', () => {
  const expected = 1
  request(app)
    .get('/')
    .query('showlist=true')
    .expect(200)
    .end(function (err, res) {
      const $ = cheerio.load(res.text)
      const actual = $('ul').length
      expect(err).toBeFalsy()
      expect(actual).toBe(expected)
    })
})

// What about these tests makes them a bit 'brittle'? What would happen if we
// had another `<ul>` element on the page? How could we improve the test?
test('GET / does not show a list', () => {
  const expected = 0
  request(app)
    .get('/')
    .expect(200)
    .end(function (err, res) {
      const $ = cheerio.load(res.text)
      const actual = $('ul').length
      expect(actual).toBe(expected)
      expect(err).toBeFalsy()
    })
})

// This test relies on another part of the program `db`, to provide us with data.
// This is because our program is written simply, but later you'll find it's
// better to isolate just the function we want to test.
test('GET /details/1 shows repo 1', () => {
  const data = db.getRepoData().repos
  const id = data[0].id
  const expected = data[0].name

  request(app)
    .get('/details/' + id)
    .expect(200)
    .end(function (err, res) {
      const $ = cheerio.load(res.text)
      const actual = $('h1').text()
      expect(actual).toBe(expected)
      expect(err).toBeFalsy()
    })
})

test('GET /details/1/author sets correct img src', () => {
  const data = db.getRepoData().repos
  const id = data[0].id
  const expected = db.getAuthorDetails(id).avatar_url

  request(app)
    .get('/details/' + id + '/author')
    .expect(200)
    .end(function (err, res) {
      const $ = cheerio.load(res.text)
      const actual = $('img').attr('src')
      expect(actual).toBe(expected)
      expect(err).toBeFalsy()
    })
})
