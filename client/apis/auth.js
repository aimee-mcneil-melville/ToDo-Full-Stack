import request from 'superagent'

import { get } from '../utils/localstorage'
import { isAuthenticated } from '../utils/auth'

export function register (creds) {
  const token = get('token')
  const headers = { Accept: 'application/json' }

  if (isAuthenticated()) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return request
    .post('/api/auth/register')
    .set(headers)
    .send(creds)
    .then(res => res.body.token)
}

export function login (creds) {
  const token = get('token')
  const headers = { Accept: 'application/json' }

  if (isAuthenticated()) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return request
    .post('/api/auth/login')
    .set(headers)
    .send(creds)
    .then(res => res.body.token)
    .catch(err => {
      throw err
    })
}
