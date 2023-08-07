import { test, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import * as db from '../../db/db.js'

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
  // One for each letter of the alphabet
  const expected = 26
  const users = await db.getUsers()
  const actual = users.length

  expect(actual).toBe(expected)
})

test('getUser gets a user by ID', async () => {
  const expected = 'Ambitious Aardvark'
  const user = db.getUser(99901)
  const actual = user.name

  expect(actual).toBe(expected)
})
