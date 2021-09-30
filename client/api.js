import request from 'superagent'

const rootUrl = '/api/v1/fruits'

const getHeaders = (token) => ({
  Accept: 'application/json',
  authorization: `Bearer ${token}`
})

export function getFruits () {
  return request.get(rootUrl)
    .then(res => {
      return res.body.fruits
    })
    .catch(logError)
}

export function addFruit (fruit, token) {
  return request.post(rootUrl)
    .set(getHeaders(token))
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function updateFruit (fruit, token) {
  return request.put(rootUrl)
    .set(getHeaders(token))
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function deleteFruit (id, token) {
  return request.delete(`${rootUrl}/${id}`)
    .set(getHeaders(token))
    .then(res => res.body.fruits)
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
