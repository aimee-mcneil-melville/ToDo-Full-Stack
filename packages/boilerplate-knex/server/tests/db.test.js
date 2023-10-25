import { test, expect, beforeEach, beforeAll, afterAll } from 'vitest'

import * as db from '../db/db.js'

let testDb = null

beforeAll(async () => {
  await db.connection.migrate.latest()
})

beforeEach(async () => {
  await db.connection.seed.run()
})

afterAll(async () => {
  await db.connection.destroy()
})

test('getUsers gets all users', async () => {
  // One for each letter of the alphabet!
  const expected = 3
  const users = await db.getUsers(testDb)
  const actual = users.length
  expect(actual).toBe(expected)
})

test('getUser gets a single user', async () => {
  const expected = 'test user 1'
  const user = await db.getUser(99901, testDb)
  const actual = user.name

  expect(actual).toBe(expected)
})
