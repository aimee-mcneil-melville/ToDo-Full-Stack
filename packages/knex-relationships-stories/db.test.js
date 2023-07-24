import { test, expect, beforeAll, beforeEach } from 'vitest'
import * as db from './db.js'

beforeAll(() => {
  return db.connection.migrate.latest()
})

beforeEach(() => {
  return db.connection.seed.run()
})

test('getUsers gets all users', () => {
  // One for each letter of the alphabet!
  return db.getUsers().then((users) => {
    expect(users).toHaveLength(26)
  })
})

test('getUser gets a single user', () => {
  return db.getUser(99901).then((user) => {
    expect(user.name).toBe('Ambitious Aardvark')
  })
})
