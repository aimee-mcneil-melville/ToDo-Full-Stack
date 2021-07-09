const { chromium } = require('playwright')
const config = require('../../server/db/knexfile').development
const db = require('knex')(config)
const { serverUrl } = require('./index')
const isHeadless = process.env.HEADLESS || false

jest.setTimeout(20000)

let browser
let page
beforeAll(async () => {
  console.log('PROC ENV PORT:', process.env.PORT)
  browser = await chromium.launch({ headless: isHeadless === 'true', slowMo: 800 })
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
  await page.goto(serverUrl)
  await page.click('text=Sign in')
  expect(await page.url()).toBe(`${serverUrl}/signin`)
  await page.fill('#username', 'admin')
  await page.fill('#password', 'admin')
  await page.click('button', { force: true })
  expect(await page.url()).toBe(`${serverUrl}/gardens/1`)
  await page.click('text=Add New Event')
  expect(await page.url()).toBe(`${serverUrl}/event/new`)
  await page.fill('#title', 'Christmas Gardening!')
  await page.fill('[type=date]', '2021-12-25')
  await page.fill('[type=number]', '100')
  await page.fill('#description', "I don't want a lot for Christmas, there is just one thing I need, I don't care about the presents, underneath the Christmas tree, I just want you for my own, more than you could ever know, make my wish come true, all I want for Christmas is you")
  expect(await page.innerText('.box .title')).toBe('Christmas Gardening!')
  await Promise.all([
    page.waitForNavigation(),
    page.click('button', { force: true })
  ])
  expect(await page.url()).toBe(`${serverUrl}/gardens/1`)
  expect(await page.content()).toMatch('Christmas Gardening!')
})
