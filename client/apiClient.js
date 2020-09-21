import request from 'superagent'
import { register } from 'authenticare/client'

const rootUrl = '/api/v1'

export function getGardens () {
  return request.get(rootUrl + '/gardens')
    .then(res => {
      return res.body.gardens
    })
}

export function registerUser (username, password, garden) {
  return register(
    {
      username: username,
      password: password,
      garden: garden
    },
    { baseUrl: rootUrl }
  )
    .then((token) => {
      return token
    })
    .catch((error) => {
      console.log('error: ', error.message)
    })
}
