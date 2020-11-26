import 'regenerator-runtime/runtime'
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

  await page.click('text="Sign in"')
  await page.goto('http://localhost:3000/#/signin')

  const signIn = page.url('http://localhost:3000/#/signin')

  // expect(page).toBe(signIn)
  expect(page).toBe('http://localhost:3000/#/signin')
})
