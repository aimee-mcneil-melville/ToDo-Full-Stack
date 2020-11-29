import 'regenerator-runtime/runtime'
const playwright = require('playwright')
let browser
let page

const app = 'http://localhost:3000/#/'
const garden = 'http://localhost:3000/#/garden'
const newEvent = 'http://localhost:3000/#/events/new'

beforeAll(async () => {
  browser = await playwright.chromium.launch({
    headless: false,
    slowMo: 1000
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

test('clicking on add event button takes you to add event page', async () => {
  // Goes to 'http://localhost:3000/#/garden'
  await page.goto(garden)

  // Clicks on the Add new event button/tag
  await page.click('text="Add new event"')

  // Grabs the new url of the page
  const url = page.url()

  // Checks the Url and sets what is epxected
  expect(url).toBe('http://localhost:3000/#/events/new')
})

test('Form is present and takes users input for new event', async () => {
  // Goes to 'http://localhost:3000/#/garden'
  await page.goto(newEvent)

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

  await page.click('button[class="button my-4 is-primary"]')

  await page.goto()

  expect(title).toBe('Test Event')
}, 40000)
