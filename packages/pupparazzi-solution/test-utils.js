import { within } from '@testing-library/dom'
import { JSDOM } from 'jsdom'

const render = (response) => {
  const { document } = new JSDOM(response.text).window
  return within(document)
}

export { render }
