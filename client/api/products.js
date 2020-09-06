import request from 'superagent'

const apiRoot = '/api/v1/'

export function getProducts () {
  return request.get(`${apiRoot}products`)
    .then(res => res.body)
}
