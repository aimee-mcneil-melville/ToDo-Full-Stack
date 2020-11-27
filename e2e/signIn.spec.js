import 'regenerator-runtime/runtime'
const playwright = require('playwright')
let browser
let page
// Declare app variable
const app = 'http://localhost:3000/#/signin'
beforeAll(async () => {
  browser = await playwright.chromium.launch({
    headless: true
  })
})
beforeEach(async () => {
  page = await browser.newPage()
})
afterAll(async () => {
  await browser.close()
})
afterEach(async () => {
  await page.close()
})

test('username and password is entered correctly', async () => {
  await page.goto(app)
  // Click input[name="username"]
  await page.click('input[name="username"]')

  // Fill input[name="username"]
  await page.fill('input[name="username"]', 'admin')

  // Click input[name="password"]
  await page.click('input[name="password"]')

  // Fill input[name="password"]
  await page.fill('input[name="password"]', 'admin')

  const username = await page.$eval('[name="username"]', userName => userName.value)

  const password = await page.$eval('[name="password"]', password => password.value)

  expect(username).toMatch('admin')
  expect(password).toMatch('admin')
})

test('clicking the signin button takes you to the garden page', async () => {
  await page.goto(app)

  // Fill input[name="username"]
  await page.fill('input[name="username"]', 'admin')

  // Fill input[name="password"]
  await page.fill('input[name="password"]', 'admin')

  //   await page.click('text="Sign in"')

  await page.click('button[data-testid="submit-button"]')
  const url = 'http://localhost:3000/#/garden'

  expect(url).toBe('http://localhost:3000/#/garden')
})

// "test:e2e": "jest --testPathPattern=e2e"
