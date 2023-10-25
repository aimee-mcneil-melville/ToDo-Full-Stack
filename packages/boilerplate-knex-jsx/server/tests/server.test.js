import { test, expect, vi } from 'vitest'
import request from 'supertest'

import * as db from '../db/db.js'
import server from '../server.js'
import { render } from './test-utils.js'

vi.mock('../db/db.js')

test('GET /', async () => {
  vi.mocked(db.getUser).mockImplementation(async (id) => {
    return { id: id, name: 'test user', email: 'test@user.nz' }
  })

  vi.mocked(db.getUsers).mockImplementation(async () => {
    return [
      { id: 2, name: 'test user 2', email: 'test2@user.nz' },
      { id: 4, name: 'test user 4', email: 'test4@user.nz' },
    ]
  })

  const res = await request(server).get('/')

  expect(res.statusCode).toBe(200)
  const screen = render(res)
  const firstLiText = screen.getByText('test user 2 (test2@user.nz)')
  expect(firstLiText).toBeInTheDocument()
})
