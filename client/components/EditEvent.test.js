import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import EditEvent from './EditEvent'

test('Event preview updates correctly on user input', () => {
  render(<EditEvent />)

  const input = screen.getByPlaceholderText('event title')
  expect(input.value).toBe('')

  fireEvent.change(input, { target: { value: 'Weeding Worker Bee' } })

  expect(input.value).toBe('Weeding Worker Bee')
})
