import request from 'superagent'

export async function getProducts() {
  const res = await request.get('/api/v1/products')
  return res.body as unknown
}
