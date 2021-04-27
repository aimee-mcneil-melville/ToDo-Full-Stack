export {
  isAuthenticated,
  register,
  signIn,
  getDecodedToken,
  logOff
} from 'authenticare/client'

export const config = {
  baseUrl: '/api/v1'
}
