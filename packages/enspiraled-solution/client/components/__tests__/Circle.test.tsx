import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

describe('Circle', () => {
  it('shows 4 more circles when clicked', () => {
    render(<App width={512} height={512} />)

    const circle = screen.getByTestId('circle')
    expect(circle).toBeInTheDocument()

    userEvent.click(circle)

    const circles = screen.getAllByTestId('circle')
    expect(circles).toHaveLength(5)
  })

  it('removes all children circles when double clicked', () => {
    render(<App width={512} height={512} />)

    const circle = screen.getByTestId('circle')
    expect(circle).toBeInTheDocument()

    userEvent.click(circle)
    userEvent.dblClick(circle)

    const circles = screen.getAllByTestId('circle')
    expect(circles).toHaveLength(1)
  })
})
