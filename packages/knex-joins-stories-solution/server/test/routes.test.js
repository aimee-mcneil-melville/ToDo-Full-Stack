import { test, expect } from 'vitest'
import request from 'supertest'

import server from '../server.js'

test('list wombles', async () => {
  const expected = 'WOMBLES!'
  const res = await request(server).get('/')
  expect(res.text).toBe(expected)
})
