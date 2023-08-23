import { within } from '@testing-library/dom'
import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'
import { JSDOM } from 'jsdom'

expect.extend(matchers)

export function render(response) {
  const { document } = new JSDOM(response.text).window
  return within(document)
}
