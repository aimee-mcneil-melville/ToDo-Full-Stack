import 'regenerator-runtime/runtime'
const playwright = require('playwright')

const connection = require('../server/db/connection')

// Declare variables
let browser
let page
const register = 'http://localhost:3000/#/register'

// Run this before all tests
beforeAll(async () => {
  connection.migrate.latest()
  browser = await playwright.chromium.launch({
    headless: true
  })
})

// Run this before each test
beforeEach(async () => {
  connection.seed.run()
  page = await browser.newPage()
})

// Run this after all tests
afterAll(async () => {
  connection.destroy()
  await browser.close()
})

// Run this after each test
afterEach(async () => {
  await page.close()
})

test.skip('Username is a string', async () => {
  await page.goto(register)

  await page.click('[name="username"]')
  await page.fill('[name="username"]', 'Dave')

  const finalText = await page.$eval('[name="username"]', userName => userName.value)
  expect(typeof finalText).toBe('string')
}, 10000)

test('User can register', async () => {
  await page.goto(register)

  // Click input[name="username"]
  await page.click('input[name="username"]')

  // Fill input[name="username"]
  await page.fill('input[name="username"]', 'Leshgooo123')

  // Click input[name="password"]
  await page.click('input[name="password"]')

  // Fill input[name="password"]
  await page.fill('input[name="password"]', '12356')

  // Select garden dropdown
  await page.selectOption('select[id="name"]', '2')

  // Define and target username value
  const userName = await page.$eval('[name="username"]', userName => userName.value)

  // Define and target password value
  const userPass = await page.$eval('[name="password"]', userName => userName.value)

  // Click button
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[data-testid="submitButton"]')
  ])

  const url = page.url()

  expect(url).toBe('http://localhost:3000/#/garden')
  expect(userName).toBe('Leshgooo123')
  expect(userPass).toBe('12356')
}, 99999)

// As far as UI goes this is all we can test currently. Maybe in future test to make sure username and password contain valid characters and that clicking on the register button takes you to your profile page (or wherever its endpoint is).
