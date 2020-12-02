const playwright = require('playwright')
const connection = require('../server/db/connection')
let browser
let page

const app = 'http://localhost:3000/#/'

beforeAll(async () => {
  connection.migrate.latest()
  browser = await playwright.chromium.launch({
    headless: true
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

test('That input fields are populated with events original data', async () => {
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
  const title = 'Weeding worker Bee'
  const date = '27082020'
  const volunteers = '8'
  const description = 'Its time to get these weeds under control.'

  // Hard coded to work for first event. Will need update for dynamic functionality.
  expect(url).toBe('http://localhost:3000/#/events/1/edit')
  expect(title).toBe('Weeding worker Bee')
  expect(date).toBe('27082020')
  expect(volunteers).toBe('8')
  expect(description).toBe('Its time to get these weeds under control.')
}, 99999)

test('That input fields for event are editable', async () => {
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

  const title = 'Test Event'

  // Clicks on Event title field
  await page.click('input[name="title"]')

  // Fill event title field with test data
  await page.fill('input[name="title"]', 'Test Event')

  await page.click('button[class="button mt-6"]')

  expect(title).toBe('Test Event')
}, 90000)
