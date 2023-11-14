// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react/pure'

import App from '../App.tsx'

describe('<App />', () => {
  it('renders how we expect', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
})
