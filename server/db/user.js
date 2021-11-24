const connection = require('./connection')

function getUser (id, db = connection) {
  return db('users')
    .where('id', id)
    .select()
    .first()
    .then(result => {
      return result
    })
}

// function addUser(inviteCode, db = connection){
//     return db('users')

// }

// function updateUser (id, user, db = connection) {
//   return db('users')
//     .where('id', id)
//     .update(user)
// }

module.exports = {
  getUser
//   updateUser
  // addUser
}
