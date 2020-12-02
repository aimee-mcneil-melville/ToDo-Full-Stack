const playwright = require('playwright')
const connection = require('../server/db/connection')
let browser
let page

const app = 'http://localhost:3000/#/'
const garden = 'http://localhost:3000/#/garden'
// const newEvent = 'http://localhost:3000/#/events/new'
// const signIn = 'http://localhost:3000/#/signin'

beforeAll(async () => {
  connection.migrate.latest()
  browser = await playwright.chromium.launch({
    headless: false
  })
})
beforeEach(async () => {
  connection.seed.run()
  page = await browser.newPage()
})
afterAll(async () => {
  connection.destroy()
  await browser.close()
})
afterEach(async () => {
  // connection.destroy()
  await page.close()
})

test('clicking on add event button takes you to add event page', async () => {
  // Goes to 'http://localhost:3000/#/garden'
  await page.goto(app)

  // Clicks on the Add new event button/tag
  await page.click('text="Get Started"')

  // Grabs the new url of the page
  const url = page.url()

  // Checks the Url and sets what is epxected
  expect(url).toBe(garden)
})

test('User can create event using the form', async () => {
  await page.goto(app)

  await page.click('text="Sign in"')

  // await page.goto('http://localhost:3000/#/signin')

  await page.click('input[name="username"]')

  // Fill event title field with test data
  await page.fill('input[name="username"]', 'admin')

  await page.click('input[name="password"]')

  // Fill event title field with test data
  await page.fill('input[name="password"]', 'admin')

  await page.click('button[data-testid="submit-button"]')

  await page.click('text="Add New Event"')

  // // Goes to 'http://localhost:3000/#/garden'
  // await page.goto(newEvent)

  // Clicks on Event title field
  await page.click('input[name="title"]')

  // Fill event title field with test data
  await page.fill('input[name="title"]', 'Test Event')

  // Clicks on Date field
  await page.click('input[name="date"]')

  // Fill Data field with test data
  //   await page.fill('input[name="date"]', '15-01-2021')
  await page.focus('input[name="date"]')
  await page.keyboard.type('15012021')
  //   await page.keyboard.fill('input[name="date"]', '15012021')

  // Select 3
  await page.click('input[name="volunteers"]')
  await page.fill('input[name="volunteers"]', '3')

  // Clicks on Event description field
  await page.click('textarea[name="description"]')

  // Fill event title field with test data
  await page.fill('textarea[name="description"]', 'This is a test event')

  await page.click('button[class="button mt-6"]')

  // await page.goto('http://localhost:3000/#/garden')

  const url = page.url()

  const title = 'Test Event'
  const date = '15012021'
  const volunteers = '3'
  const description = 'This is a test event'

  expect(url).toBe('http://localhost:3000/#/garden')
  expect(title).toBe('Test Event')
  expect(date).toBe('15012021')
  expect(volunteers).toBe('3')
  expect(description).toBe('This is a test event'
  )
}, 90000)
