import { expect } from 'vitest'
import { within } from '@testing-library/dom'
import matchers from '@testing-library/jest-dom/matchers'
import { JSDOM } from 'jsdom'

expect.extend(matchers)

export function render(response) {
  const { document } = new JSDOM(response.text).window
  return within(document.body)
}
