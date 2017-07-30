// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')
var request = require('supertest')

var app = require('../../server')
var setupDb = require('../setup-db')

setupDb(test, (db) => {
  app.set('knex', db)
})

test.cb('getUsers gets all users', (t) => {
  var expected = 26
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      t.is(res.body.users.length, expected)
      t.end()
    })
})
