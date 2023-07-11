import matchers, {
  TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'

beforeEach(cleanup)
expect.extend(matchers)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
    interface Matchers<R = void, T = {}>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}
