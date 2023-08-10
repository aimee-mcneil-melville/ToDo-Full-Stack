import { expressjwt as jwt, GetVerificationKey } from 'express-jwt'
import jwks from 'jwks-rsa'
import request from 'superagent'
import 'dotenv/config'


const domain = process.env.AUTH0_DOMAIN
const ssoAudience = process.env.AUTH0_SSO_AUDIENCE
const machine2machineClientId = process.env.AUTH0_MACHINE_2_MACHINE_CLIENT_ID
const machine2machineSecret = process.env.AUTH0_MACHINE_2_MACHINE_SECRET

export const getUserRoles = async (uid: string) => {
  const accessToken = await getAccessToken()
  const { body } = await request(`${domain}/api/v2/users/${uid}/roles`).set({
    authorization: `Bearer ${accessToken}`,
  })

  return body[0]?.name as string | undefined
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
export const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  audience: ssoAudience,
  issuer: `${domain}/`,
  algorithms: ['RS256'],
})
