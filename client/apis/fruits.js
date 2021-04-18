import request from 'superagent'

const rootUrl = '/api/v1'

export function getFriends () {
  return request.get(rootUrl + '/friends')
    .then(res => {
      return res.body.fruits // need to update //
    })
}
