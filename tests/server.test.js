//needed to fix encoding problem with jest - https://stackoverflow.com/questions/49141927/express-body-parser-utf-8-error-in-test?rq=1
require('../node_modules/iconv-lite/encodings')

const supertest = require('supertest')

const cheerio = require('cheerio')

const app = require('../server')

test('profile 1 should be Silvia', function () {
  supertest(app)
    .get('/profiles/1')
    .end(checkProfileIsSilvia)

  function checkProfileIsSilvia (err, res) {
    if (err) throw err

    const $ = cheerio.load(res.text)
    const actual = $('h1').text()

    const expected = 'Silvia'

    expect(actual).toBe(expected)
  }
})


test('profile 2 should be Sampson', function () {
  supertest(app)
    .get('/profiles/2')
    .end(function (err, res) {
      if (err) throw err

      const $ = cheerio.load(res.text)
      const actual = $('h1').text()

      const expected = 'Sampson'

      expect(actual).toBe(expected)
    })
})

test('post function works', function () {
  supertest(app)
    .post('/named-compliment')
    .send({"name": 'alice'})
    .type('form')
    .end((err, res) => {
      if (err) console.log(err)
      const actual = res.text
      const expected = "You are wonderful alice"
      expect(actual).toBe(expected)
    })
})
