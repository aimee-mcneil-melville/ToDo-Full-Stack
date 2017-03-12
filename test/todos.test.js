// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')
var knex = require('knex')

// Notice that we require the `.test` property from the knexfile
var config = require('../knexfile').test
var todos = require('../todos')

// Create a separate in-memory database before each test.
// In our tests, we can get at the database as `t.context.db`.
test.beforeEach(function (t) {
  t.context.db = knex(config)
  return t.context.db.migrate.latest()
    .then(function () {
      return t.context.db.seed.run('test')
    })
})

// Destroy the database connection after each test.
test.afterEach(function (t) {
  t.context.db.destroy()
})

// This will fail until you:
//  - export the `getAll` function
//  - modify it to allow a test database to be passed in as a function parameter
test('getAll returns three todos', function (t) {
  // Arrange
  var expected = 3

  // Act
  // Be sure to always use `return` when testing with promises
  return todos.getAll(t.context.db)
    .then(function (results) {
      var actual = results.length

      // When testing async functions, we always assert inside `.then`. Why?

      // Assert
      t.is(actual, expected)
    })
})
