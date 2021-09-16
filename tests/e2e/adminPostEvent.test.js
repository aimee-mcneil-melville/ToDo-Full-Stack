const { chromium } = require('playwright')
const config = require('../../server/db/knexfile').development
const db = require('knex')(config)
const { serverUrl } = require('./index')

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

  await page.fill('#username', 'admin')
  await page.fill('#password', 'admin')

  await Promise.all([
    page.waitForNavigation(),
    page.click('.c132a5a03', { force: true })
  ])

  expect(await page.content()).toMatch('Log out')

  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Add New Event')
  ])

  expect(await page.content()).toMatch('Create Event')

  await page.fill('#title', 'Christmas Gardening!')
  await page.fill('[type=date]', '2021-12-25')
  await page.fill('[type=number]', '100')
  await page.fill(
    '#description',
    "I don't want a lot for Christmas, there is just one thing I need, I don't care about the presents, underneath the Christmas tree, I just want you for my own, more than you could ever know, make my wish come true, all I want for Christmas is you"
  )

  expect(await page.innerText('.box .title')).toBe('Christmas Gardening!')

  await Promise.all([
    page.waitForNavigation(),
    page.click('button', { force: true })
  ])
  expect(await page.content()).toMatch('Christmas Gardening!')
})
