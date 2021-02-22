const playwright = require('playwright')

const connection = require('../server/db/connection')

const homeUrl = 'http://localhost:3000/#/'
const gardenUrl = homeUrl + 'garden'
const registerUrl = homeUrl + 'register'
const signInUrl = homeUrl + 'signin'

test('User can register, sign out and sign in again', async () => {
  // SETUP -----------------------
  await connection.migrate.latest()
  await connection.seed.run()
  browser = await playwright.chromium.launch()
  page = await browser.newPage()
  // -----------------------------

  await page.goto(homeUrl)

  // navigate to register pages
  await Promise.all([
    page.waitForNavigation(),
    page.click('a:text("Register")'),
  ])
  expect(page.url()).toBe(registerUrl)

  // fill out registration form
  await page.click('input[name="username"]')
  await page.fill('input[name="username"]', 'Leshgooo1234')

  await page.click('input[name="password"]')
  await page.fill('input[name="password"]', '12356')

  await page.selectOption('select[id="garden"]', '2')

  // submit registration
  await Promise.all([
    page.waitForNavigation(),
    // this really should be an assertion rather than a waitFor...
    page.waitForSelector('h3:text("Kingsland Community Orchard")'),
    page.click('button:text("Register")'),
  ])
  expect(page.url()).toBe(gardenUrl)

  // Log out
  await Promise.all([page.waitForNavigation(), page.click('a:text("Log out")')])
  expect(page.url()).toBe(homeUrl)

  // Navigate to sign in page
  await Promise.all([page.waitForNavigation(), page.click('a:text("Sign in")')])
  expect(page.url()).toBe(signInUrl)

  // fill out sign in form
  await page.click('input[name="username"]')
  await page.fill('input[name="username"]', 'Leshgooo1234')

  await page.click('input[name="password"]')
  await page.fill('input[name="password"]', '12356')

  // click sign in button
  await Promise.all([
    page.waitForNavigation(),
    // this really should be an assertion rather than a waitFor...
    page.waitForSelector('h3:text("Kingsland Community Orchard")'),
    page.click('button:text("Sign in")'),
  ])
  expect(page.url()).toBe(gardenUrl)

  // TEARDOWN ------------
  await page.close()
  await browser.close()
  await connection.destroy()
  // ---------------------
}, 99999)
