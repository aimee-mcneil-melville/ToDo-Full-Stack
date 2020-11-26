import 'regenerator-runtime/runtime'
const playwright = require('playwright');

(async () => {
  // Launch the browser
  const browser = await playwright.chromium.launch({
    headless: true
  })

  // make a new context
  const context = await browser.newContext()

  // Open a new page
  const page = await context.newPage()

  // Go to http://localhost:3000/#/
  await page.goto('http://localhost:3000/#/')

  // Close the browser
  await browser.close()

  // Run test
})()

test('browser title should display Gardenz', async () => {
  await page.goto('http://localhost:3000/#/')
  const title = await page.title()
  console.log(await page.title())
  expect(title).toContain('Gardenz')
})
