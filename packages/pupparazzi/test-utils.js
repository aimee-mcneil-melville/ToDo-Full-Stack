const { within } = require('@testing-library/dom')
const { JSDOM } = require('jsdom')

const render = (response) => {
  const { document } = new JSDOM(response.text).window
  return within(document)
}

module.exports = { render }
