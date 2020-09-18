const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const users = require('./users')



test('getUserByName returns the correct user', () => {
    return users.getUserByName('benpai', testDb)
    .then(user => {
        expect(user.username).toBe('benpai')
        expect(user.garden_id).toBe(1)
    })
})

test('createUser creates a new user', () => {
    const user = {
        username: 'new',
        password: 'hello',
        garden_id: 1
    }
    return users.createUser(user, testDb) 
    .then(user => {
        expect(user).toEqual([4])
    })
})

test('userExists returns true if user exists, otherwise returns false', () => {
    return users.userExists('benpai', testDb)
      .then(bool => {
        expect(bool).toBe(true)
      })
  })

  test('getUserById returns the correct user', () => {
    return users.getUserById(1, testDb)
    .then(user => {
        expect(user.username).toBe('benpai')
        
    })
})