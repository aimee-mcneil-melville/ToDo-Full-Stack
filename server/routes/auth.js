const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const request = require('superagent')

/*
* this object holds the required information to acquire a new access token for the purpose of retrieving
* the user's role using machine-to-machine.
* The clientid and secret are for the API Explorer Application
* NOTE: the access token passed to routes from the client would not work, because it has a different audience.
*/
const apiExplorer = {
  domain: 'https://gardenz.au.auth0.com',
  clientId: '2cxnaycUS9BKgNlesVGlfIGIQZjVxPTu',
  secret: 'WSWxcWFQNZWgUFn_ojRwYuraFkynxs6yFwu-SHMnl1AvzXt4JE-cfN2y-B5Aw_Pa'
}

const getUserRoles = async (uid) => {
  const accessToken = await getAccessToken()
  const { body } = await request(`${apiExplorer.domain}/api/v2/users/${uid}/roles`)
    .set({ authorization: `Bearer ${accessToken}` })

  return body[0].name
}

const getAccessToken = async () => {
  const data = {
    grant_type: 'client_credentials',
    client_id: apiExplorer.clientId,
    client_secret: apiExplorer.secret,
    audience: `${apiExplorer.domain}/api/v2/`
  }

  const { body } = await request.post(`${apiExplorer.domain}/oauth/token`)
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
    jwksUri: `${apiExplorer.domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://garden/nz/api',
  issuer: `${apiExplorer.domain}/`,
  algorithms: ['RS256']
})

module.exports = {
  getUserRoles,
  checkJwt
}
