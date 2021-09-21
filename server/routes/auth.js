const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const request = require('superagent')

const domain = process.env.AUTH0_DOMAIN
const clientId = process.env.AUTH0_API_EXPLORER_CLIENTID
const secret = process.env.AUTH0_API_EXPLORER_SECRET

const getUserRoles = async (uid) => {
  const accessToken = await getAccessToken()
  const { body } = await request(`${domain}/api/v2/users/${uid}/roles`)
    .set({ authorization: `Bearer ${accessToken}` })

  return body[0].name
}

const getAccessToken = async () => {
  const data = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: secret,
    audience: `${domain}/api/v2/`
  }

  const { body } = await request.post(`${domain}/oauth/token`)
    .send(data)
    .type('form')
  return body.access_token
}

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://garden/nz/api',
  issuer: `${domain}/`,
  algorithms: ['RS256']
})

module.exports = {
  getUserRoles,
  checkJwt
}
