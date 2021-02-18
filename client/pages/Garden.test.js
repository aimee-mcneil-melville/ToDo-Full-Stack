import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRedux } from '../test-utils'

import Garden from './Garden'
import { getGarden } from './gardenHelper'

jest.mock('./gardenHelper')

describe('Garden', () => {
  it('calls getGarden helper and displays garden data on mount', () => {
    renderWithRedux(<Garden />, {
      initialState: {
        garden: {
          name: 'test garden',
          description: 'an excellent test garden',
          url: 'cooltestgarden.com',
          events: [],
          address: 'cool place, nz',
          lat: 123,
          lon: -123
        }
      }
    })
    return screen.findByRole('heading', { name: 'test garden' })
      .then(() => {
        const url = screen.getByRole('link', { name: 'cooltestgarden.com' })
        expect(getGarden).toHaveBeenCalled()
        expect(url).toBeInTheDocument()
        expect(url.href).toMatch('cooltestgarden.com')
        return null
      })
  })
})
