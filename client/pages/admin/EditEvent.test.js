import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import EditEvent from './EditEvent'

import { getEvent } from './editEventHelper'

jest.mock('./editEventHelper')

describe('form field', () => {
  it('updates correctly on user input', () => {
    getEvent.mockImplementation(() => Promise.resolve({
      title: 'Tai\'s anime fight',
      date: '2020-12-17',
      volunteersNeeded: 1000,
      description: '1000 man fight battle royale. Leshgooooo'
    }))
    const params = { params: { id: 2 } }
    render(<EditEvent match={params}/>)

    return screen.findByPlaceholderText('event title')
      .then((input) => {
        expect(input).toHaveValue('Tai\'s anime fight')
        fireEvent.change(input, { target: { value: 'Weeding Worker Bee' } })
        expect(input).toHaveValue('Weeding Worker Bee')
        return null
      })
  })
})
