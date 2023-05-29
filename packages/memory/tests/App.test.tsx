// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from '../client/components/App'

describe('<App />', () => {
  it('renders a board', () => {
    render(<App />)
    const board = screen.getByTestId('Board')
    expect(board).toHaveTextContent('🌰🌽🌾🍍🍁🍍🌿🌽🌿🍀🌰🍇🌾🍇🍁🍀')
  })
})
