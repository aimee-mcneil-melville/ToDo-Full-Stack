/* global jest test expect */
import { test, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../../server.js'
import * as db from '../../db/db.js'

vi.mock('../../db/db.js')

test('/users returns all users', async () => {
  vi.mocked(db.getUsers)
    .mockImplementation(
      async () => [
        { id: 2, name: 'test user 2', email: 'test2@user.nz' },
        { id: 4, name: 'test user 4', email: 'test4@user.nz' },
      ])


  const expected = 2
  const res = await request(server)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
  expect(res.body.users.length).toBe(expected)
})

test('/users/:id returns a user by ID', async () => {
  vi.mocked(db.getUser).mockImplementation(async (id) =>
    ({ id: id, name: 'test user', email: 'test@user.nz' })
  )

  const expected = 'test@user.nz'
  const res = await request(server)
    .get('/users/10')
    .expect('Content-Type', /json/)
    .expect(200)
  expect(res.body.user.id).toBe(10)
  expect(res.body.user.email).toBe(expected)
})
