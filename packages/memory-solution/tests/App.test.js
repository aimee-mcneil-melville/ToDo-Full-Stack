import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from '../client/components/App'
import Board from '../client/components/Board'

describe('<App />', () => {
  test('renders a board', () => {
    const wrapper = render(<App />)
    const board = screen.findByTestId('board')
    expect(board).toBeInTheDocument()
  })
})
