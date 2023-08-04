import { expect, test, vi } from 'vitest'
import request from 'supertest'
import { render } from './test-utils.js'
import * as db from './db.js'
import server from './server.js'

vi.mock('./db.js')

test('GET / responds with correctly rendered users', async () => {
  db.getUsers.mockImplementation(async () => {
    return [
      { id: 2, name: 'test user 2', email: 'test2@user.nz' },
      { id: 4, name: 'test user 4', email: 'test4@user.nz' },
    ]
  })

  const res = await request(server).get('/').expect(200)

  const screen = render(res)

  const user2 = screen.getByText('test user 2 (test2@user.nz)')
  expect(user2).toBeInTheDocument()

  const user4 = screen.getByText('test user 4 (test4@user.nz)')
  expect(user4).toBeInTheDocument()
})