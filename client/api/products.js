import request from 'superagent'

export function getProducts () {
  return request.get('/api/v1/products')
    .then((res) => res.body)
}
