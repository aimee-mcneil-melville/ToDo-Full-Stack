// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Wombats from '../Wombats'

import { useAppSelector } from '../../hooks'

beforeEach(() => {
  cleanup()
})

vi.mock('../../hooks')

vi.mocked(useAppSelector).mockImplementation(() => ['wombat1', 'wombat2'])

describe('Wombats', () => {
  it('renders a list of wombats', () => {
    render(<Wombats />)

    const wombats = screen.getAllByRole('listitem')
    expect(wombats).toHaveLength(2)
  })
})
