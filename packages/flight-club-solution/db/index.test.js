import { expect, test, beforeAll, beforeEach } from 'vitest'
import knex from 'knex'
import knexfile from './knexfile.js'
import * as flightDb from './index.js'

const db = knex(knexfile.testing)

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

test('1. List all my tickets by `id` ', async () => {
  const myTickets = await flightDb.getMyTickets(1)
  expect(myTickets).toHaveLength(1)
  expect(myTickets[0]).toHaveProperty('passenger_id')
})

test('2. List all my tickets by `dob`', async () => {
  const myTickets = await flightDb.getMyTicketsByDob('2512')
  expect(myTickets).toHaveLength(2)
  expect(myTickets[0]).toHaveProperty('passenger_id')
})

test('3. Count all my tickets given `passenger.dob', async () => {
  const actual = await flightDb.countMyTicketsByDob('2512')
  expect(actual.count).toBe(2)
})

test('4. How many luggage have you lost?', async () => {
  const actual = await flightDb.countMyLostLuggage('2512')
  expect(actual.count).toBe(4)
})

test('5. What is the total weight of your luggage where `is_lost` equals `true`?', async () => {
  const actual = await flightDb.sumMyLostLuggageWeight('2512')
  expect(actual.sum).toBe(62)
})

test('6. List the airport `phone` and `email` where your lost luggage are found at', async () => {
  const actual = await flightDb.getMyLostLuggageLocation('2512')
  expect(actual).toHaveLength(4)
  expect(actual[0]).toHaveProperty('phone')
  expect(actual[0].email).toMatch(/Kahulu/i)
})
