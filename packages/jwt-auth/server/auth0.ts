import { expressjwt as jwt } from 'express-jwt'
import jwks from 'jwks-rsa'

// TODO: set the domain and audience (API Identifier)
const domain = 'https://'
const audience = 'https://'

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }) as any,
  audience: audience,
  issuer: `${domain}/`,
  algorithms: ['RS256'],
})

export default checkJwt
