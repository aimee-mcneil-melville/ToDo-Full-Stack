import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import EditEvent from './EditEvent'

jest.mock('./EditEventHelper', () => {
  return {
    getEvent: () => Promise.resolve({ title: 'Tai\'s anime fight', date: '2020-12-17', volunteersNeeded: 1000, description: '1000 man fight battle royale. Leshgooooo' })
  }
})

const params = { params: { id: 2 } }

test('Event preview updates correctly on user input', () => {
  render(<EditEvent match={params}/>)

  const input = screen.getByPlaceholderText('event title')
  expect(input.value).toBe('')

  fireEvent.change(input, { target: { value: 'Weeding Worker Bee' } })

  expect(input.value).toBe('Weeding Worker Bee')
})
