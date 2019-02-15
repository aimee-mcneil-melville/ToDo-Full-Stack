const test = require('ava')
const request = require('supertest')

const createServer = require('../../server/server')
const greetingsDb = require('../../server/db/greeting')
const setupDb = require('./setup-db')

setupDb(test,createServer)

test.cb('GET /', t => {
  request(t.context.app)
    .get('/api/greetings')
    .expect(200)
    .end((err,res) => {
      if (err) console.log(err);
      t.is(res.body.length, 3)
      t.end()
    })
})

test.cb('read greetings db', t => {
  greetingsDb.getGreetings(t.context.db)
    .then(greetings => {
      t.is(greetings.length, 3)
      t.true(greetings[0].hasOwnProperty('text'))
      t.end()
    })
})
