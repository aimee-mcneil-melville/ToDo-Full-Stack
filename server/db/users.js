const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)


module.exports = {
    // createUser,
    // userExists,
    getUserByName
  }



  function getUserByName (username, db = connection) {
    return db('users')
      .select()
      .where('username', username)
      .first()
  }