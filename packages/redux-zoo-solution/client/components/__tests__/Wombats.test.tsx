/**
 * @jest-environment jsdom
 *
 * Unit test for the Wombats component
 */
import { render, screen } from '@testing-library/react'
import Wombats from '../Wombats'

import { useAppSelector } from '../../hooks'
jest.mock('../../hooks')

jest.mocked(useAppSelector).mockImplementation(() => ['wombat1', 'wombat2'])

describe('Wombats', () => {
  it('renders a list of wombats', () => {
    render(<Wombats />)

    const wombats = screen.getAllByRole('listitem')
    expect(wombats).toHaveLength(2)
  })
})
