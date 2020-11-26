const playwright = require('playwright');

(async () => {
  // Launch the browser
  const browser = await playwright.chromium.launch({
    headless: false,
    devtools: true
  })

  // make a new context
  const context = await browser.newContext()

  // Open a new page
  const page = await context.newPage()

  // Go to http://localhost:3000/#/
  await page.goto('http://localhost:3000/#/')

  // Close the browser
//   await browser.close()
})()
