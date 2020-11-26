const playwright = require('playwright');

(async () => {
  // Code execution happens within here
  const browser = await playwright.chromium.launch({
    headless: false
  })

  // context
  const context = await browser.newContext()

  // page
  const page = await context.newPage()

  // navigate to page
  await page.goto('http://localhost:3000/#/')

//   await browser.close()
})()
