import request from 'superagent'

import { getAccessToken } from './auth-utils'

const baseUrl = '/api/v1'

export default async function consume (endpoint, method = 'get', data = {}) {
  const payLoadMethod = method.toLowerCase() === 'get' ? 'query' : 'send'
  const headers = {
    Accept: 'application/json'
  }

  const token = await getAccessToken()

  const authHeader = {
    Authorization: `Bearer: ${token}`
  }

  return request[method](baseUrl + endpoint)
    .set(authHeader)
    .set(headers)[payLoadMethod](data)
    .then((res) => res)
    .catch((err) => {
      const errMessage = err.response?.body?.error?.title
      throw new Error(errMessage || err.message)
    })
}
