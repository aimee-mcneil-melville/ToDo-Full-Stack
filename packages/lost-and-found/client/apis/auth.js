import {
  register as authRegister,
  signIn as authLogin,
} from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'

const errorMessages = {
  USERNAME_UNAVAILABLE: 'Sorry, that username is taken.',
  INVALID_CREDENTIALS: 'Sorry, your username or password is incorrect.',
}

export function register(creds) {
  return authRegister(creds, { baseUrl })
    .then((mystery) => {
      console.log('then', mystery)
      return mystery
    })
    .catch((err) => {
      console.log(err.message)
      throw errorMessages[err.message]
    })
}

export function login(creds) {
  return authLogin(creds, { baseUrl }).catch((err) => {
    console.log(err.message)
    throw errorMessages[err.message]
  })
}
