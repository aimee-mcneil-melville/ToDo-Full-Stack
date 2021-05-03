const { chromium } = require('playwright')

let browser
beforeAll(async () => {
  browser = await chromium.launch({headless:false, slowMo:500})
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

test('Clicking get started when not logged in redirects to login', async () => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('localhost:3000')
  await page.click('text=Get Started')
  expect(await page.url()).toBe('http://localhost:3000/signin')
})

test('Register fill in redirects to garden after signing up', async () => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('localhost:3000/register')
  await page.fill('#username', 'Peteraaaaaaaa');
  await page.fill('#password', 'Peter');
  await page.fill('#email', 'peteraaaaaaaaa@peteremail.com');
  await page.selectOption('select#garden', '1');
  await page.click('button', { force: true });
  expect(await page.url()).toBe('http://localhost:3000/garden')

})