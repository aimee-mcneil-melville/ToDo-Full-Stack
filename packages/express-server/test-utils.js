import { expect } from 'vitest'
import { within } from '@testing-library/dom'
import { JSDOM } from 'jsdom'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

export function render(response) {
  return within(new JSDOM(response.text).window.document)
}
