import request from 'superagent'

const baseUrl = '/api/v1'

export default function consume (endpoint, method = 'get', data = {}) {
  const payLoadMethod = method.toLowerCase() === 'get' ? 'query' : 'send'
  const headers = {
    Accept: 'application/json'
  }

  return request[method](baseUrl + endpoint)
    .set(headers)[payLoadMethod](data)
    .then(res => res)
    .catch(err => {
      throw err
    })
}
