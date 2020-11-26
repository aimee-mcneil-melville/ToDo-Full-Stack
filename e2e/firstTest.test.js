// import 'regenerator-runtime/runtime'
const playwright = require('playwright')

// Declare app variable
const app = 'http://localhost:3000/#/'

test('browser title should display Gardenz', async () => {
  // Launch the browser
  const browser = await playwright.chromium.launch({
    headless: true
  })

  // make a new context (think of it like a tab in your browser)
  // const context = await browser.newContext()

  // Open a new page
  // const page = await context.newPage()

  // User goes to the homepage
  await page.goto(app)

  // Assign the page's title to a variable
  const title = await page.title()

  // We expect the title to contain gardenz
  expect(title).toContain('Gardenz')

  // Close the browser
  await browser.close()
})
