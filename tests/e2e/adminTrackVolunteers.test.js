const { chromium } = require('playwright')
const config = require('../../server/db/knexfile').development
const db = require('knex')(config)
const { serverUrl } = require('./index')
const isHeadless = process.env.HEADLESS || false

jest.setTimeout(20000)

let browser
let page
beforeAll(async () => {
  browser = await chromium.launch({ headless: isHeadless === 'true', slowMo: 500 })
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
  await page.goto(serverUrl)
  await page.click('text=Sign in')
  expect(await page.url()).toBe(`${serverUrl}/signin`)
  await page.fill('#username', 'admin')
  await page.fill('#password', 'admin')
  await page.click('button', { force: true })
  expect(await page.url()).toBe(`${serverUrl}/gardens/1`)
  expect(await page.content()).toMatch('15 of 16 volunteers still needed')
})
