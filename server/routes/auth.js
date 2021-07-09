// const express = require('express')
// const { applyAuthRoutes } = require('authenticare/server')

// const {
//   userExists,
//   getUserByName,
//   createUser
// } = require('../db/users')

// const router = express.Router()

// module.exports = router

// applyAuthRoutes(router, {
//   userExists,
//   getUserByName,
//   createUser
// })

const jwt = require('express-jwt')
const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')

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
    jwksUri: 'https://gardenz.au.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'https://garden/nz/api',
  issuer: 'https://gardenz.au.auth0.com/',
  algorithms: ['RS256']
})

module.exports = checkJwt
