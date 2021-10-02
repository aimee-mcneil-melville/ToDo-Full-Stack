import request from 'superagent'

const rootUrl = '/api/v1'

const getHeaders = (token) => ({
  Accept: 'application/json',
  authorization: `Bearer ${token}`
})

export function getFruits () {
  return request.get(`${rootUrl}/fruits`)
    .then(res => {
      return res.body.fruits
    })
    .catch(logError)
}

export function addFruit (fruit, auth0Id, token) {
  return request.post(`${rootUrl}/fruits`)
    .set(getHeaders(token))
    .send({ fruit, auth0Id })
    .then(res => res.body.fruits)
    .catch(logError)
}

export function updateFruit (fruit, auth0Id, token) {
  return request.put(`${rootUrl}/fruits`)
    .set(getHeaders(token))
    .send({ fruit, auth0Id })
    .then(res => res.body.fruits)
    .catch(logError)
}

export function deleteFruit (id, auth0Id, token) {
  return request.delete(`${rootUrl}/fruits/${id}`)
    .set(getHeaders(token))
    .send({ auth0Id })
    .then(res => res.body.fruits)
    .catch(logError)
}

export async function addUser (user, token) {
  return request.post(`${rootUrl}/users`)
    .set(getHeaders(token))
    .send(user)
    .catch(logError)
}

function logError (err) {
  if (err.message === 'Forbidden') {
    throw new Error('Only the user who added the fruit may update and delete it')
  } else {
    // eslint-disable-next-line no-console
    console.error(
      'Error consuming the API (in client/api.js):',
      err.message
    )
    throw err
  }
}
