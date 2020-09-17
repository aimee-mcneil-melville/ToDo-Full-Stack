const knex = require('knex')
const { test } = require('./knexfile')
const config = require('./knexfile').test
const testDb = knex(config)

const users = require('./users')

test('createUser returns '