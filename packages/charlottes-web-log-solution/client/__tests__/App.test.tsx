import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from '../components/App'

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
