import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import Garden from './Garden'
import { getGarden } from './gardenHelper'

jest.mock('./gardenHelper')

test('calls getGarden and renders garden data on mount', () => {
  getGarden.mockImplementation(() => Promise.resolve({
    name: 'test garden',
    description: 'an excellent test garden',
    url: 'cooltestgarden.com',
    events: []
  }))
  render(<Router><Garden /></Router>)
  return screen.findByRole('heading', { name: 'test garden' })
    .then((title) => {
      const url = screen.getByRole('link', { name: 'cooltestgarden.com' })
      const description = screen.getByText((text) => text.includes('excellent'))
      expect(title).toHaveTextContent('test garden')
      expect(url).toHaveTextContent('cooltestgarden.com')
      expect(description).toHaveTextContent(/test garden$/)
      expect(url.href).toMatch('cooltestgarden.com')
      return null
    })
})
