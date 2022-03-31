const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const path = require('path')
const request = require('superagent')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const domain = process.env.AUTH0_DOMAIN
const ssoAudience = process.env.AUTH0_SSO_AUDIENCE
const machine2machineClientId = process.env.AUTH0_MACHINE_2_MACHINE_CLIENT_ID
const machine2machineSecret = process.env.AUTH0_MACHINE_2_MACHINE_SECRET

const getUserRoles = async (uid) => {
  const accessToken = await getAccessToken()
  const { body } = await request(`${domain}/api/v2/users/${uid}/roles`).set({
    authorization: `Bearer ${accessToken}`,
  })

  return body[0]?.name
}

const getAccessToken = async () => {
  const data = {
    grant_type: 'client_credentials',
    client_id: machine2machineClientId,
    client_secret: machine2machineSecret,
    audience: `${domain}/api/v2/`,
  }

  const { body } = await request
    .post(`${domain}/oauth/token`)
    .send(data)
    .type('form')
  return body.access_token
}
const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }),
  audience: ssoAudience,
  issuer: `${domain}/`,
  algorithms: ['RS256'],
})

module.exports = {
  checkJwt,
  getUserRoles,
}
