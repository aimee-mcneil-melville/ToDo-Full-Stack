export {
  isAuthenticated,
  register,
  signIn,
  getDecodedToken,
  logOff,
  getAuthorizationHeader
} from 'authenticare/client'

export const config = {
  baseUrl: '/api/v1'
}
