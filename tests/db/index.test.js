// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')

var db = require('../../db')
var setupDb = require('../setup-db.js')

setupDb(test)

test('getUsers gets all users', (t) => {
  // One for each letter of the alphabet
  var expected = 26
  return db.getUsers(t.context.db)
    .then((result) => {
      var actual = result.length
      t.is(actual, expected)
    })
})

test('getUsers gets a single user', (t) => {
  var expected = 'Ambitious Aardvark'
  return db.getUser(99901, t.context.db)
    .then((result) => {
      var actual = result[0].name
      t.is(actual, expected)
    })
})
