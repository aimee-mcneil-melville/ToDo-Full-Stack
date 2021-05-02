const { chromium } = require('playwright')

let browser
beforeAll(async () => {
  browser = await chromium.launch()
})
afterAll(async () => {
  await browser.close()
})

test('Home page should display the text Gardenz', async () => {
  const page = await browser.newPage()
  await page.goto('localhost:3000')
  expect(await page.title()).toMatch('Gardenz')
})

test('Clicking register on home goes to /register', async () => {
  const page = await browser.newPage()
  await page.goto('localhost:3000')
  await page.click('text=register')
  expect(await page.url()).toBe('http://localhost:3000/register')
})
