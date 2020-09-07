import request from 'superagent'

const apiRoot = '/api/v1/'

export function fetchProducts () {
  return request.get(`${apiRoot}products`)
    .then(res => res.body)
}
