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

test('browser title should display Gardenz', async () => {
  await page.goto(app)

  // Assign the page's title to a variable
  const title = await page.title()

  // We expect the title to contain gardenz
  expect(title).toContain('Gardenz')
})
