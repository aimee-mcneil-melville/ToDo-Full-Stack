import request from 'superagent'

const baseUrl = '/api/v1'

export default function consume(
  endpoint,
  token = '',
  method = 'get',
  data = {},
  headers = { Accept: 'application/json' }
) {
  const payLoadMethod = method.toLowerCase() === 'get' ? 'query' : 'send'

  if (!token) {
    return request[method](baseUrl + endpoint)
      .set(headers)
      [payLoadMethod](data)
      .then((res) => res)
      .catch((err) => {
        const errMessage = err.response?.body?.error?.title
        throw new Error(errMessage || err.message)
      })
  } else {
    return request[method](baseUrl + endpoint)
      .set('authorization', `Bearer ${token}`)
      .set(headers)
      [payLoadMethod](data)
      .then((res) => res)
      .catch((err) => {
        const errMessage = err.response?.body?.error?.title
        throw new Error(errMessage || err.message)
      })
  }
}
