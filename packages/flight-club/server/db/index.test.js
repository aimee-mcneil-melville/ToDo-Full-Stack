import { expect, test, beforeAll, beforeEach } from 'vitest'

import * as flightDb from './index.js'
import { afterAll } from 'vitest'

import connection from './connection.js'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run({
    specific: 'seedForTesting.js',
  })
})

afterAll(async () => {
  await connection.destroy()
})

test('1. List all my tickets by `id` ', async () => {
  const myTickets = await flightDb.getMyTickets(1)
  expect(myTickets).toHaveLength(1)
  expect(myTickets[0].passenger_id).toBe(1)
})

test('2. List all my tickets by `dob`', async () => {
  const myTickets = await flightDb.getMyTicketsByDob('9999')
  expect(myTickets).toHaveLength(1)
  expect(myTickets[0].fullname).toBe('test user')
})

test('3. Count all my tickets given `passenger.dob', async () => {
  const actual = await flightDb.countMyTicketsByDob('9999')
  expect(actual.count).toBe(1)
})

test('4. How many luggage have you lost?', async () => {
  const actual = await flightDb.countMyLostLuggage('9999')
  expect(actual.count).toBe(1)
})

test('5. What is the total weight of your luggage where `is_lost` equals `true`?', async () => {
  const actual = await flightDb.sumMyLostLuggageWeight('9999')
  expect(actual.sum).toBe(20)
})

test('6. List the airport `phone` and `email` where your lost luggage are found at', async () => {
  const actual = await flightDb.getMyLostLuggageLocation('9999')
  expect(actual.phone).toBe('0800-test-airport')
  expect(actual.email).toMatch('test@airport.com')
})
