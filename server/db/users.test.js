const knex = require('knex')
const { test } = require('./knexfile')
cosnt config = require('./knexfile').test
const testDb = knex(config)

const users = require('./users')

test('getUserByName returns the correct user', () => {
    return users.getUserByName('benpai', testDb)
        .then(user => {
            expect(user.username).toBe('benpai')
            expect(use.garden_id).toBe(1)
        })
})

test('createUser returns a new user', () => {
    const user = {
        username:'user1',
        password: 
        garden_id: 1
    }

    return users.createUser('')
})