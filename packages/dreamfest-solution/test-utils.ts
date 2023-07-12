import { within } from '@testing-library/dom'
import { JSDOM } from 'jsdom'

interface Response {
  text: string
}

export function render(response: Response) {
  const { document } = new JSDOM(response.text).window
  return within(document.body)
}
