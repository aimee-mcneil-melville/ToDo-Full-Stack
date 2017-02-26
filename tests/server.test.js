var cheerio = require('cheerio')
var request = require('supertest')
var test = require('tape')

var app = require('../server')
var db = require('../db')

test('GET /?showlist=true shows a list', function (t) {
  var expected = 1
  request(app)
    .get('/')
    .query('showlist=true')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'No request errors')

      var $ = cheerio.load(res.text)
      var actual = $('ul').length
      t.equal(actual, expected)
      t.end()
    })
})

// What about these tests makes them a bit 'brittle'? What would happen if we
// had another `<ul>` element on the page? How could we improve the test?
test('GET / does not show a list', function (t) {
  var expected = 0
  request(app)
    .get('/')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'No request errors')

      var $ = cheerio.load(res.text)
      var actual = $('ul').length
      t.equal(actual, expected)
      t.end()
    })
})

// This test relies on another part of the program `db`, to provide us with data.
// This is because our program is written simply, but later you'll find it's
// better to isolate just the function we want to test.
test('GET /details/1 shows repo 1', function (t) {
  var data = db.getRepoData().repos
  var id = data[0].id
  var expected = data[0].name

  request(app)
    .get('/details/' + id)
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'No request errors')

      var $ = cheerio.load(res.text)
      var actual = $('h1').text()
      t.equal(actual, expected)
      t.end()
    })
})

