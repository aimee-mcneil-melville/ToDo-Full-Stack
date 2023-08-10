import request from 'superagent'

const rootUrl = '/api/v1'

export async function getFruits(): Promise<string[]> {
  return request.get(rootUrl + '/fruits').then((res) => {
    return res.body.fruits
  })
}
