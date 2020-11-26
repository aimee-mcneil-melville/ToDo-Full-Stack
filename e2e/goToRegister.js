const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    // if you want devtools to open in your browser
    devtools: true
  })
  const context = await browser.newContext()

  // Open new page
  const page = await context.newPage()

  // Go to http://localhost:3000/#/
  await page.goto('http://localhost:3000/#/')

  // Click text="Register"
  await page.click('text="Register"')
  // assert.equal(page.url(), 'http://localhost:3000/#/register');

  // Close page
  // await page.close()

  // ---------------------
  // await context.close()
  // await browser.close()
})()
