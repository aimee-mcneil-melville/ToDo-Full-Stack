import React from 'react'
import { render, screen } from '@testing-library/react'

import { renderWithRedux } from '../../test-utils'

import Garden from './Garden'
import { getGarden } from './gardenHelper'

import BarGraph from '../../components/dataVis/BarGraph'

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
        },
        user: {
          id: 1
        }
      }
    })

    // we need renderWithRedux even though Garden isn't connecting to the store
    // because it's child component (Events) does
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

describe('bar graphs', () => {
  const mockEvents = [
    {
      id: 1,
      title: 'test Event 1'
    },
    {
      id: 2,
      title: 'test Event 2'
    }
  ]
  it('bar graphs shows when events array has at least one event', () => {
    render(<BarGraph events={mockEvents} />)
    const graph = screen.getByTestId('bar-graph')
    expect(graph).toBeVisible()
  })
})

describe('empty events array', () => {
  const mockEvents = []
  it('bar graphs does not show when events array is empty', () => {
    render(<BarGraph events={mockEvents} />)
    const graph = screen.queryByTestId('bar-graph')
    expect(graph).toBeVisible(false)
  })
})
