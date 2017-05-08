var test = require('ava')
var knex = require('knex')
var request = require('supertest')

// Notice that we require the `.test` property from the knexfile
var config = require('../knexfile').test
var createServer = require('../server')

// Create a separate in-memory database before each test.
// In our tests, we can get at the database as `t.context.db`.
test.beforeEach(function (t) {
  t.context.db = knex(config)
  t.context.app = createServer(t.context.db)
  return t.context.db.migrate.latest()
    .then(function () {
      return t.context.db.seed.run('test')
    })
})

// Destroy the database connection after each test.
test.afterEach(function (t) {
  t.context.db.destroy()
})

test('list wombles', (t) => {
  return request(t.context.app)
    .get('/')
    .then((res) => {
      return new Promise((resolve, reject) => {
        t.is('WOMBLES!', res.text)
        resolve()
      })
    })
})
