import 'regenerator-runtime/runtime'
const { chromium } = require('playwright')
const playwright = require('playwright')
let browser
let page
// Declare app variable
const app = 'http://localhost:3000/#/'
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

test('clicking on sign-in takes you to sign in page', async () => {
  // Go to http://localhost:3000/#/
  await page.goto(app)

  // Click text="Sign in"
  await page.click('text="Sign in"')

  const signIn = page.url()

  expect(page).toBe(signIn)
})
