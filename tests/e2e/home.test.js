const { chromium } = require('playwright')
const config = require('../../server/db/knexfile').development
const db = require('knex')(config)

let browser
beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 500 })
  await db.migrate.latest({ directory: './server/db/migrations' })
})

beforeEach(async () => {
  await db.seed.run({ directory: './server/db/seeds' })
})

afterAll(async () => {
  await browser.close()
})

test('Home page should display the text Gardenz', async () => {
  const page = await browser.newPage()
  await page.goto('localhost:3000')
  expect(await page.title()).toMatch('Gardenz')
  await page.close()
})

test('Clicking register on home goes to /register', async () => {
  const page = await browser.newPage()
  await page.goto('localhost:3000')
  await page.click('text=register')
  expect(await page.url()).toBe('http://localhost:3000/register')
  await page.close()
})

test('Clicking get started when not logged in redirects to login', async () => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('localhost:3000')
  await page.click('text=Get Started')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.close()
})

test('Clicking get sign in goes to /signin', async () => {
  const page = await browser.newPage()
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.close()
})

test('Register fill in redirects to garden after signing up', async () => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('localhost:3000/register')
  await page.fill('#username', 'bob')
  await page.fill('#password', 'bob')
  await page.fill('#email', 'bob@peteremail.com')
  await page.selectOption('select#garden', '1')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/garden')
  await page.close()
})
