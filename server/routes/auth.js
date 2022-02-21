const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const request = require('superagent')

// the later values for testing
const domain = process.env.AUTH0_DOMAIN || 'https://gardenz.au.auth0.com'
const clientId = process.env.AUTH0_API_EXPLORER_CLIENTID || 'some_client_id'
const secret = process.env.AUTH0_API_EXPLORER_SECRET || 'some_secret'

const userHasAdminRole = async (uid) => {
  const accessToken = await getAccessToken()
  const { body } = await request(`${domain}/api/v2/users/${uid}/roles`).set({
    authorization: `Bearer ${accessToken}`,
  })

  return isAdmin(body)
}

const isAdmin = (roles) => {
  if (roles) {
    return roles.some((r) => r.name === 'admin')
  }
  return false
}

const getAccessToken = async () => {
  const data = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: secret,
    audience: `${domain}/api/v2/`,
  }

  const { body } = await request
    .post(`${domain}/oauth/token`)
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
    jwksUri: `${domain}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: 'https://garden/nz/api',
  issuer: `${domain}/`,
  algorithms: ['RS256'],
})

module.exports = {
  userHasAdminRole,
  isAdmin,
  checkJwt,
}
