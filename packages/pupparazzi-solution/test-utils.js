const { within } = require('@testing-library/dom')
const { JSDOM } = require('jsdom')

export const render = (response) =>
  within(new JSDOM(response.text).window.document)
