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

