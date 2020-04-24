import { register as authRegister, signIn as authLogin } from 'authenticare/client'

const errorMessages = {
  "USERNAME_UNAVAILABLE": "Sorry, that username is taken.",
  "INVALID_CREDENTIALS": "Sorry, your username or password is incorrect.",
}

export function register (creds) {
  return authRegister(creds, {
      baseUrl: process.env.BASE_API_URL // see .env and webpack.config.js
    })
    .catch(err => {
      throw errorMessages[err.response.body.errorType]
    })
}

export function login (creds) {
  return authLogin(creds, {
    baseUrl: process.env.BASE_API_URL // see .env and webpack.config.js
    })
    .catch(err => {
      throw errorMessages[err.response.body.errorType]
    })
}
