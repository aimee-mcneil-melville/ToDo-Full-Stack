import request from 'superagent'

const rootUrl = '/api/v1'

export function getFriends (id) {
  console.log(id)
  return request.get(rootUrl + '/friends/' + id)
    .then(res => {
      return res.body.friends
    })
}
