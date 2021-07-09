const { chromium } = require('playwright')
const config = require('../../server/db/knexfile').development
const db = require('knex')(config)
const { serverUrl } = require('./index')

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
test('Member can Login & Volunteer', async () => {
  await page.goto(serverUrl)
  expect(await page.textContent('h2.title')).toBe('Welcome!')
  await page.click('text=Sign in')
  expect(await page.url()).toBe(`${serverUrl}/signin`)
  await page.fill('#username', 'member')
  await page.fill('#password', 'member')
  await page.click('button', { force: true })
  expect(await page.url()).toBe(`${serverUrl}/gardens/1`)
  await page.click('text=Volunteer')
  expect(await page.content()).toMatch('Un-Volunteer')
})
