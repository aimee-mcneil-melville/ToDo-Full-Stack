var supertest = require('supertest')
var cheerio = require('cheerio')
var test = require('tape')

var app = require('../server')

test('profile 1 should be Silvia', function (t) {
  supertest(app)
    .get('/profiles/1')
    .end(checkProfileIsSilvia)

  function checkProfileIsSilvia (err, res) {
    if (err) throw err

    var $ = cheerio.load(res.text)
    var title = $('h1').text()

    var expected = 'Silvia'

    t.equal(title, expected)
    t.end()
  }
})


test('profile 2 should be Sampson', function (t) {
  supertest(app)
    .get('/profiles/2')
    .end(function (err, res) {
      if (err) throw err

      var $ = cheerio.load(res.text)
      var title = $('h1').text()

      var expected = 'Sampson'

      t.equal(title, expected)
      t.end()

    })
})

