import 'regenerator-runtime/runtime'
const playwright = require('playwright')
const connection = require('../server/db/connection')
let browser
let page

const app = 'http://localhost:3000/#/'
const garden = 'http://localhost:3000/#/garden'
const newEvent = 'http://localhost:3000/#/events/new'
const signIn = 'http://localhost:3000/#/signin'

beforeAll(async () => {
  connection.migrate.latest()
  browser = await playwright.chromium.launch({
    headless: false,
    slowMo: 1000
  })
})
beforeEach(async () => {
  connection.seed.run()
  page = await browser.newPage()
})
afterAll(async () => {
  connection.destroy()
  await browser.close()
})
afterEach(async () => {
  // connection.destroy()
  await page.close()
})

test('Clicking on edit event button takes you to edit page', async () => {
  await page.goto(app)

  await page.click('text="Sign in"')

  // Steps to sign in

  await page.click('input[name="username"]')
  await page.fill('input[name="username"]', 'admin')
  await page.click('input[name="password"]')
  await page.fill('input[name="password"]', 'admin')
  await page.click('button[data-testid="submit-button"]')

  await page.waitForLoadState('networkidle')
  // Getting to editEvent page

  await page.click('text="Edit Event"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/events/1/edit')
})
