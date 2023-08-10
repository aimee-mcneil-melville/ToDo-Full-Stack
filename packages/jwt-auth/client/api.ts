import request from 'superagent'
import { Fruit, NewFruit } from '../models/fruit.ts'

const rootUrl = '/api/v1'

export function getFruits(): Promise<Fruit[]> {
  return request
    .get(`${rootUrl}/fruits`)
    .then((res) => res.body.fruits)
    .catch(logError)
}

export function addFruit(fruit: NewFruit, token: string): Promise<Fruit[]> {
  return request
    .post(`${rootUrl}/fruits`)
    .set('Authorization', `Bearer ${token}`)
    .send({ fruit })
    .then((res) => res.body.fruits)
    .catch(logError)
}

export function updateFruit(fruit: Fruit, token: string): Promise<Fruit[]> {
  return request
    .put(`${rootUrl}/fruits`)
    .set('Authorization', `Bearer ${token}`)
    .send({ fruit })
    .then((res) => res.body.fruits)
    .catch(logError)
}

export function deleteFruit(id: number, token: string): Promise<Fruit[]> {
  return request
    .delete(`${rootUrl}/fruits/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body.fruits)
    .catch(logError)
}

function logError(err: Error) {
  if (err.message === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error(
      'Only the user who added the fruit may update and delete it'
    )
  } else {
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
