const { within } = require('@testing-library/dom')
const { JSDOM } = require('jsdom')

const render = (response) => within(new JSDOM(response.text).window.document)

module.exports = { render }
