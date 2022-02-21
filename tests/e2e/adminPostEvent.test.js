const { chromium } = require('playwright')
const config = require('../../server/db/knexfile').development
const db = require('knex')(config)
const { serverUrl } = require('./index')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../../server/.env') })

jest.setTimeout(20000)

let browser
let page
beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 500 })
  await db.migrate.latest({ directory: './server/db/migrations' })
})

beforeEach(async () => {
  const context = await browser.newContext()
  page = await context.newPage()
  await db.seed.run({ directory: './server/db/seeds' })
})

afterEach(async () => {
  await page.close()
})

afterAll(async () => {
  await browser.close()
  return db.destroy()
})

// Test goes here
test('Admin can login & add event', async () => {
  // going to localhost:3000
  await page.goto(serverUrl)

  // clicking on sign In
  await Promise.all([page.waitForNavigation(), page.click('text=Sign in')])

  // checking if the url changes to /signin
  expect(await page.url()).toContain(
    'https://gardenz.au.auth0.com/u/login?state='
  )

  const testEmail = process.env.E2E_TEST_AUTH0_ADMIN_EMAIL
  const testPassword = process.env.E2E_TEST_AUTH0_ADMIN_PASSWORD
  const testFirstName = process.env.E2E_TEST_ADMIN_FIRST_NAME
  const testLastName = process.env.E2E_TEST_ADMIN_LAST_NAME
  const testGarden = process.env.E2E_TEST_ADMIN_GARDEN_ID

  await page.fill('#username', testEmail)
  await page.fill('#password', testPassword)

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type=submit]', { force: true }),
  ])

  await page.waitForSelector('text=Log out')
  expect(await page.content()).toMatch(/Log out/)

  await Promise.all([page.waitForNavigation(), page.click('text=My Profile')])

  await page.fill('#firstName', testFirstName)
  await page.fill('#lastName', testLastName)
  await page.selectOption('#garden', testGarden)

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type=submit]', { force: true }),
  ])

  await Promise.all([page.waitForNavigation(), page.click('text=My Garden')])

  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Add New Event'),
  ])

  expect(await page.content()).toMatch('Create Event')

  await page.fill('#title', 'Christmas Gardening!')
  await page.fill('[type=date]', '2021-12-25')
  await page.fill('[type=number]', '100')
  await page.fill(
    '#description',
    "I don't want a lot for Christmas, there is just one thing I need, I don't care about the presents, underneath the Christmas tree, I just want you for my own, more than you could ever know, make my wish come true, all I want for Christmas is you"
  )

  expect(await page.$eval('#title', (el) => el.value)).toMatch(
    /Christmas Gardening!/
  )

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type=submit]', { force: true }),
  ])

  await page.click('text=Christmas Gardening!')

  expect(await page.$eval('section', (el) => el.innerText)).toMatch(
    /Christmas Gardening!/
  )

  await page.click('text=Log Out')
})
