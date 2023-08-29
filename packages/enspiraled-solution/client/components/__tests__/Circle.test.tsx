// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import App from '../App.tsx'

expect.extend(matchers)
afterEach(cleanup)

describe('Circle', () => {
  it('shows 4 more circles when clicked', async () => {
    render(<App width={512} height={512} />)
    const user = userEvent.setup()

    const circle = screen.getByTestId('circle')
    expect(circle).toBeInTheDocument()

    await user.click(circle)

    const circles = screen.getAllByTestId('circle')
    expect(circles).toHaveLength(5)
  })

  it('removes all children circles when double clicked', async () => {
    render(<App width={512} height={512} />)
    const user = userEvent.setup()

    const circle = screen.getByTestId('circle')
    expect(circle).toBeInTheDocument()

    await user.click(circle)
    await user.dblClick(circle)

    const circles = screen.getAllByTestId('circle')
    expect(circles).toHaveLength(1)
  })
})
