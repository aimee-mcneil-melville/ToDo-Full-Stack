const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)
const { generateHash } = require('authenticare/server')

module.exports = {
    createUser,
    userExists,
    getUserByName
}

function createUser(user, db = connection) {
    return userExists(user.username, db)
        .then(exists => {
            if (exists) {
                return Promise.reject(new Error('User exists'))
            }
        })
        .then(() => generateHash(user.password))
        .then(passwordHash => {
            return db('users').insert({ username: user.username, hash: passwordHash })
        })

    //.then using userID to get new user
}

