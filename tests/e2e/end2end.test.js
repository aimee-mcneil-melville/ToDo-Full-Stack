const { chromium } = require('playwright')
const config = require('../../server/db/knexfile').development
const db = require('knex')(config)
const isHesdless = process.env.HEADLESS || true

jest.setTimeout(20000)

let browser
let page
beforeAll(async () => {
  browser = await chromium.launch({ headless: isHesdless, slowMo: 800 })
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

// USER TESTS

test('Home page should display the text Gardenz', async () => {
  await page.goto('localhost:3000')
  expect(await page.title()).toMatch('Gardenz')
})

test('Clicking register on home goes to /register', async () => {
  await page.goto('localhost:3000')
  await page.click('text=register')
  expect(await page.url()).toBe('http://localhost:3000/register')
})

test('Clicking get started when not logged in redirects to register', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Get Started')
  expect(await page.url()).toBe('http://localhost:3000/signin')
})

test('Clicking Sign in goes to /signin', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
})

test('Can Register', async () => {
  await page.goto('localhost:3000/register')
  await page.fill('#firstName', 'bob')
  await page.fill('#lastName', 'dylan')
  await page.fill('#username', 'bob')
  await page.fill('#password', 'bob')
  await page.fill('#email', 'bob@peteremail.com')
  await page.selectOption('select#garden', '1')
  await Promise.all([
    page.waitForNavigation(),
    await page.click('button', { force: true })
  ])
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
})

test('Can Login', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'member')
  await page.fill('#password', 'member')
  await page.click('button', { force: true })
})

test('Can Login & Logout', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'member')
  await page.fill('#password', 'member')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
  await page.click('text=Log out')
  expect(await page.url()).toBe('http://localhost:3000/')
})

test('Can Login & Volunteer', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'member')
  await page.fill('#password', 'member')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
  await page.click('text=Volunteer')
  expect(await page.content()).toMatch('Un-Volunteer')
})

test('Can Login & volunteer, then logout, relogin & un-volunteer', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'member')
  await page.fill('#password', 'member')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
  await page.click('text=Volunteer')
  expect(await page.content()).toMatch('Un-Volunteer')
  await page.click('text=Log out')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'member')
  await page.fill('#password', 'member')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
  await page.click('text=Un-Volunteer')
  expect(await page.content()).toMatch('Volunteer')
})

// ADMIN TESTS

test('Can Login as Admin', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'admin')
  await page.fill('#password', 'admin')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
})

test('Admin can login & add event', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'admin')
  await page.fill('#password', 'admin')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
  await page.click('text=Add New Event')
  expect(await page.url()).toBe('http://localhost:3000/event/new')
  await page.fill('#title', 'Christmas Gardening!')
  await page.fill('[type=date]', '2021-12-25')
  await page.fill('[type=number]', '100')
  await page.fill('#description', "I don't want a lot for Christmas, there is just one thing I need, I don't care about the presents, underneath the Christmas tree, I just want you for my own, more than you could ever know, make my wish come true, all I want for Christmas is you")

  await Promise.all([
    page.waitForNavigation(),
    page.click('button', { force: true })
  ])
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
  expect(await page.content()).toMatch('Christmas Gardening!')
})

test('Admin can login & edit event', async () => {
  await page.goto('localhost:3000')
  await page.click('text=Sign in')
  expect(await page.url()).toBe('http://localhost:3000/signin')
  await page.fill('#username', 'admin')
  await page.fill('#password', 'admin')
  await page.click('button', { force: true })
  expect(await page.url()).toBe('http://localhost:3000/gardens/1')
  await page.click('text=Edit Event')
  await page.fill('#title', 'Come for a fun day out weeding!')
  await page.fill('[type=date]', '2020-08-28')
  await page.fill('[type=number]', '50')
  await page.fill('#description', 'Please come out and help us, we need alot more volunteers now on the new day.')
  await Promise.all([
    page.waitForNavigation(),
    page.click('button', { force: true })
  ])
  expect(await page.url()).toBe('http://localhost:3000/events/1')
  expect(await page.content()).toMatch('Come for a fun day out weeding!')
})
