const playwright = require('playwright')
let browser
let page
// Declare app variable
const app = 'http://localhost:3000/#/'
const signIn = 'http://localhost:3000/#/signin'
const myRegister = 'http://localhost:3000/#/register'

beforeAll(async () => {
  browser = await playwright.chromium.launch({
    headless: true
    // slowMo: 2000
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

// THE FOLLOWING TESTS ARE FROM THE HOME PAGE!!!!!!!!!!!!!!

test('clicking on sign-in takes you to sign in page', async () => {
  await page.goto(app)

  await page.click('text="Sign in"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/signin')
})

test('clicking on register takes you to register page', async () => {
  await page.goto(app)

  await page.click('text="Register"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/register')
})

test('clicking on garden button takes you to garden page', async () => {
  await page.goto(app)

  await page.click('text="Garden"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/garden')
}, 20000)

// THE FOLLOWING TESTS ARE FROM THE SIGN IN PAGE!!!!!!!!!!!!!!

test('clicking on register (from sign in page) takes you to register page', async () => {
  await page.goto(signIn)

  await page.click('text="Register"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/register')
})

test('clicking on Home(from sign in page) takes you to Home page', async () => {
  await page.goto(signIn)

  await page.click('text="Home"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/')
})

test('clicking on LOGO(from sign in page) takes you to Home page', async () => {
  await page.goto(signIn)

  await page.click('text="Garde"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/')
})

// THE FOLLOWING TESTS ARE FROM THE REGISTER PAGE!!!!!!!!!!!!!!

test('clicking on sign in (from register page) takes you to sign in page', async () => {
  await page.goto(myRegister)

  await page.click('text="Sign in"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/signin')
})

test('clicking on Home(from register page) takes you to Home page', async () => {
  await page.goto(myRegister)

  await page.click('text="Home"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/')
})

test('clicking on LOGO(from register page) takes you to Home page', async () => {
  await page.goto(myRegister)

  await page.click('text="Garde"')

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/')
})
