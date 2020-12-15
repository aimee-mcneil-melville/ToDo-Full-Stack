import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Garden from './Garden'
import { getGarden } from './gardenHelper'
import { renderWithRedux } from '../test-utils'

jest.mock('./gardenHelper')

test('calls getGarden and renders garden data on mount', () => {
  getGarden.mockImplementation((setGarden) => {
    setGarden({
      name: 'test garden',
      description: 'an excellent test garden',
      url: 'cooltestgarden.com',
      events: [],
      address: 'cool place, nz',
      lat: 123,
      lon: -123
    })
    return Promise.resolve()
  })
  renderWithRedux(<Garden />)
  return screen.findByRole('heading', { name: 'test garden' })
    .then((title) => {
      const url = screen.getByRole('link', { name: 'cooltestgarden.com' })
      const description = screen.getByText((text) => text.includes('excellent'))
      const eventsTitle = screen.getByRole('heading', { name: 'Events' })
      expect(title).toHaveTextContent('test garden')
      expect(eventsTitle).toBeInTheDocument()
      expect(url).toBeInTheDocument()
      expect(description).toHaveTextContent(/test garden$/)
      expect(url.href).toMatch('cooltestgarden.com')
      return null
    })
})
