import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

describe('App', () => {
  it('shows a circle', () => {
    render(<App width={512} height={512} />)

    const circle = screen.getByTestId('circle')
    expect(circle).toBeInTheDocument()
  })
  it('resets the screen when the reset button is clicked', () => {
    render(<App width={512} height={512} />)

    const circle = screen.getByTestId('circle')
    expect(circle).toBeInTheDocument()

    userEvent.click(circle)
    // after clicking the circle, there should be 5 more circles
    const circles = screen.getAllByTestId('circle')
    expect(circles).toHaveLength(5)

    const resetButton = screen.getByRole('button', { name: /reset/i })
    userEvent.click(resetButton)
    // after clicking the reset button, there should be only 1 circle
    const newCircle = screen.queryAllByTestId('circle')
    expect(newCircle).toHaveLength(1)
  })
})
