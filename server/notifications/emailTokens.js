const { sign, verify } = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const secret = process.env.JWT_SECRET

module.exports = {
  encode(item) {
    return sign(item, secret)
  },
  decode(jwt) {
    return verify(jwt, secret)
  },
}
