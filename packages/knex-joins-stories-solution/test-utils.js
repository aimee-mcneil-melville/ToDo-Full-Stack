import { within } from '@testing-library/dom'
import { JSDOM } from 'jsdom'
import { expect } from 'vite'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

export function render(response) {
  const { document } = new JSDOM(response.text).window
  return within(document)
}
