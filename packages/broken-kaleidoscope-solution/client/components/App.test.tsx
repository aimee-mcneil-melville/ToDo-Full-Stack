// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.tsx'

vi.spyOn(Math, 'random').mockImplementation(() => 7) // the most random number

describe('<App />', () => {
  it('renders a hundred pixels with random colors', () => {
    render(<App />)

    const pixels = screen.getAllByRole('button')
    expect(pixels).toHaveLength(100)
    expect(pixels[0]).toMatchInlineSnapshot(`
      <button
        draggable="true"
        style="display: block; width: 10px; height: 10px; background-color: rgb(112, 0, 0);"
      />
    `)
  })
})
