const jwt = require('jsonwebtoken')

function getToken (userId, username, email, isAdmin) {
  const tokenObject = {
    id: userId,
    username: username,
    is_admin: isAdmin,
    email: email
  }
  return jwt.sign(tokenObject, process.env.JWT_SECRET)
}

module.exports = getToken
