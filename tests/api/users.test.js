// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')
var request = require('supertest');

var db = require('../../db')
var app = require('../../server')
var setup_db = require('../setup_db')

setup_db(test, function(db) {
  app.set('knex', db)
})

test.cb('getUsers gets all users', function (t) {
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err
      t.is(26, res.body.users.length)
      t.end()
    })
})

