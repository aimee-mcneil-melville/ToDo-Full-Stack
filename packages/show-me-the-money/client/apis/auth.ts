import {
  register as authRegister,
  signIn as authLogin,
  Register,
  Cred
} from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'

const errorMessages = {
  USERNAME_UNAVAILABLE: 'Sorry, that username is taken.',
  INVALID_CREDENTIALS: 'Sorry, your username or password is incorrect.',
}

export function register(creds: Register) {
  return authRegister(creds, { baseUrl })
    .then((mystery) => {
      console.log('then', mystery);
      return mystery
    })
    .catch((err: Error) => {
      console.log(err.message)
      if (
        err.message === 'USERNAME_UNAVAILABLE' ||
        err.message === 'INVALID_CREDENTIALS'
      )
      throw errorMessages[err.message]
    throw new Error(err.message)
  })
}

export function login(creds: Cred) {
  return authLogin(creds, { baseUrl }).catch((err: Error) => {
    console.log(err.message);
    if (
      err.message === 'USERNAME_UNAVAILABLE' ||
      err.message === 'INVALID_CREDENTIALS'
    )    
      throw errorMessages[err.message]
    throw new Error(err.message)
  })
}
