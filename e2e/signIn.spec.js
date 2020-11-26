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
  const username =
  
  await page.goto(app)
  // Click input[name="username"]
  await page.click('input[name="username"]');

  // Fill input[name="username"]
  await page.fill('input[name="username"]', 'admin');

  // Click input[name="password"]
  await page.click('input[name="password"]');

  // Fill input[name="password"]
  await page.fill('input[name="password"]', 'admin');

  expect(page)
})

test('clicking the signin button takes you to the garden page', async () => {

  // Click button[data-testid="submit-button"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/#/garden' }*/),
    page.click('button[data-testid="submit-button"]')
  ]);

  expect(page).toBe('http://localhost:3000/#/garden')
})

// "test:e2e": "jest --testPathPattern=e2e"
