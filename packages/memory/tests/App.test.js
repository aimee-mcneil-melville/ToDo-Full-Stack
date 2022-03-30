import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from '../client/components/App'
// import Board from '../client/components/Board'

describe('<App />', () => {
  test('renders a board', () => {
    render(<App />)
    const board = screen.getByTestId('Board')
    expect(board).toHaveTextContent('🌰🌽🌾🍍🍁🍍🌿🌽🌿🍀🌰🍇🌾🍇🍁🍀')
  })
})
