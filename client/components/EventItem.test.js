import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import EventItem from './EventItem'
import { MemoryRouter } from 'react-router'

test('events show edit event button for admin', () => {
  render(<MemoryRouter> <EventItem isAdmin={true} event={{}}/> </MemoryRouter>)
  expect(screen.getByRole('link')).toHaveTextContent('Edit Event')
})

test('events hide edit event button for member', () => {
  render(<MemoryRouter><EventItem isAdmin={false} event={{}}/> </MemoryRouter>)
  expect(screen.queryByRole('link')).toBeNull()
})
