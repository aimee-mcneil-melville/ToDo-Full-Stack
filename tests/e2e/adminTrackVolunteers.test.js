const { chromium } = require('playwright')
const config = require('../../server/db/knexfile').development
const db = require('knex')(config)

jest.setTimeout(10000)

let browser
let page
beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 500 })
  await db.migrate.latest({ directory: './server/db/migrations' })
})

beforeEach(async () => {
  const context = await browser.newContext()
  page = await context.newPage()
  await db.seed.run({ directory: './server/db/seeds' })
})

afterEach(async () => {
  await page.close()
})

afterAll(async () => {
  await browser.close()
  return db.destroy()
})

// Test goes here
test('Admin can track volunteer', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'admin')
  await page.fill('#password', 'admin')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
  expect(await page.content()).toMatch('15 of 16 volunteers still needed')
})
