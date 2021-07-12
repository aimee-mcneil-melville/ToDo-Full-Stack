// const {
//   generateHash,
//   getTokenDecoder
// } = require('authenticare/server')

// module.exports = {
//   generateHash,
//   getTokenDecoder
// }

const request = require('request')

function getUserRoles (uid, token) {
  var options = {
    method: 'GET',
    url: `https://gardenz.au.auth0.com/api/v2/users/${uid}/roles`,
    headers: { authorization: `bearer ${token}` }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)

    console.log(body)
  })
}

module.exports = getUserRoles
