import { test, expect } from 'vitest'
import request from 'supertest'

import server from '../server.js'
import { render } from '../test-utils.js'

test('profile 1 should be Silvia', async () => {
  const res = await request(server).get('/profiles/1')
  const document = render(res)
  const h1 = document.getByRole('heading')

  const actual = h1.textContent
  const expected = 'Silvia'

  expect(actual).toBe(expected)
})

test('profile 2 should be Sampson', async () => {
  const res = await request(server).get('/profiles/2')
  const document = render(res)

  const h1 = document.getByRole('heading')

  const actual = h1.textContent
  const expected = 'Sampson'

  expect(actual).toBe(expected)
})

test('post function works', async () => {
  const res = await request(server)
    .post('/named-compliment')
    .send({ name: 'alice' })
    .type('form')

  const actual = res.text
  const expected = 'You are wonderful alice'
  expect(actual).toBe(expected)
})
