const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 2000
  })
  const context = await browser.newContext()

  // Open new page
  const page = await context.newPage()

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/')

  // Go to http://localhost:3000/#/
  await page.goto('http://localhost:3000/#/')

  // Click text="Register"
  await page.click('text="Register"')
  // assert.equal(page.url(), 'http://localhost:3000/#/register');

  // Click input[name="username"]
  await page.click('input[name="username"]')

  // Fill input[name="username"]
  await page.fill('input[name="username"]', 'Dave')

  // Click input[name="password"]
  await page.click('input[name="password"]')

  // Fill input[name="password"]
  await page.fill('input[name="password"]', 'password')

  // Select 3
  await page.selectOption('select[id="name"]', '3')

  // Click button[data-testid="submitButton"]
  await page.click('button[data-testid="submitButton"]')

  // Close page
  await page.close()

  // ---------------------
  await context.close()
  await browser.close()
})()
