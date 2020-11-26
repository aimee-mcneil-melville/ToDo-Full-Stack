const playwright = require('playwright');

(async () => {
  // Code execution happens within here
  const browser = await playwright.chromium.launch({
    headless: false
  })

  // make a new context
  const context = await browser.newContext()

  // Open a new page
  const page = await context.newPage()

  // Go to http://localhost:3000/#/
  await page.goto('http://localhost:3000/#/')

//   await browser.close()
})()
