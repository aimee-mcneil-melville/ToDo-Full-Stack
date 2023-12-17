// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { screen, render, cleanup } from '@testing-library/react/pure'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
afterEach(cleanup)

import App from '../components/App.tsx'

describe('<App />', () => {
  it('looks like this', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })

  it("Links to wilber's blog", () => {
    render(<App />)

    const link = screen.getByRole('link', {
      name: 'Wilber',
    }) as HTMLAnchorElement
    expect(link.href).toBe('https://wilber.net/blog')
  })
})
