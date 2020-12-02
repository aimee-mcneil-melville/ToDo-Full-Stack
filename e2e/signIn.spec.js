const playwright = require('playwright')

const connection = require('../server/db/connection')
// const environment = process.env.NODE_ENV

let browser
let page
// Declare app variable
const app = 'http://localhost:3000/#/signin'

// Run this before all tests
beforeAll(async () => {
  connection.migrate.latest()
  browser = await playwright.chromium.launch({
    headless: true
  })
})

// Run this before each test
beforeEach(async () => {
  connection.seed.run()
  page = await browser.newPage()
})

// Run this after all tests
afterAll(async () => {
  connection.destroy()
  await browser.close()
})

// Run this after each test
afterEach(async () => {
  await page.close()
})

test('username and password are each a string', async () => {
  await page.goto(app)
  // Click input[name="username"]
  await page.click('input[name="username"]')

  // Fill input[name="username"]
  await page.fill('input[name="username"]', 'test')

  // Click input[name="password"]
  await page.click('input[name="password"]')

  // Fill input[name="password"]
  await page.fill('input[name="password"]', 'test')

  const username = await page.$eval('[name="username"]', userName => userName.value)

  const password = await page.$eval('[name="password"]', password => password.value)

  expect(typeof username).toBe('string')
  expect(typeof password).toBe('string')
})

test('clicking the signin button takes you to the garden page', async () => {
  await page.goto(app)
  await page.click('input[name="username"]')
  // Fill input[name="username"]
  await page.fill('input[name="username"]', 'test')
  await page.click('input[name="password"]')
  // Fill input[name="password"]
  await page.fill('input[name="password"]', 'test')

  await page.click('button[data-testid="submit-button"]')
  await page.waitForLoadState('networkidle')

  // await Promise.all([
  //   page.waitForNavigation(),
  //   page.click('button[data-testid="submitButton"]')
  // ])

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/garden')
})

// "test:e2e": "jest --testPathPattern=e2e"
