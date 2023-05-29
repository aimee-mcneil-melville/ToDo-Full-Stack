import { expect, beforeEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import matchers, {
  TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'
import App from './components/App'

beforeEach(cleanup)
expect.extend(matchers)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/ban-types
    interface Matchers<R = void, T = {}>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}
export default function setupApp() {
  const user = userEvent.setup()
  const container = render(<App />)
  return { user, ...container }
}
