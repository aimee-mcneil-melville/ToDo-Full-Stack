import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Events from './Events'
import { MemoryRouter } from 'react-router'

test('events show add event button for admin', () => {
  render(<MemoryRouter> <Events isAdmin={true} events={[]}/> </MemoryRouter>)
  expect(screen.getByRole('link')).toHaveTextContent('Add new event')
})

test('events hide add event button for member', () => {
  render(<MemoryRouter><Events isAdmin={false} events={[]}/> </MemoryRouter>)
  expect(screen.queryByRole('link')).toBeNull()
})
