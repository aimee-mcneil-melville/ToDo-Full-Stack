import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRouter } from '../../test-utils'

import Home from './Home'
import { getGardenLocations, getUserLocation } from './homeHelper'

jest.mock('./homeHelper')

afterEach(() => {
  getUserLocation.mockClear()
})

describe('getting garden locations on mount', () => {
  it('calls getGardenLocations helper and displays garden markers on mount', () => {
    getGardenLocations.mockImplementation(() =>
      Promise.resolve({
        gardenCoords: [
          {
            lat: -36.86667,
            lon: 174.76667,
          },
          {
            lat: -36.8888888,
            lon: 174.7777777,
          },
        ],
        addrs: ['address 1', 'address 2'],
        names: ['name 1', 'name 2'],
      })
    )
    renderWithRouter(<Home />)
    return screen.findAllByRole('img').then((markers) => {
      // 2 marker images per actual marker (marker + shadow)
      expect(markers).toHaveLength(1)
      return null
    })
  })
})

describe('getting user location on mount', () => {
  it('displays user marker', () => {
    getGardenLocations.mockImplementation(() =>
      Promise.resolve({
        gardenCoords: [],
        addrs: [],
        names: [],
      })
    )
    getUserLocation.mockImplementation((cbFunc) => {
      cbFunc({ lat: -36.86667, lon: 174.76667 })
    })
    renderWithRouter(<Home />)
    return screen.findByRole('img').then((marker) => {
      expect(marker).toBeInTheDocument()
      return null
    })
  })
})

describe('unmount cleanup', () => {
  it('does not set user coords if unmounted', () => {
    expect.assertions(1)
    getGardenLocations.mockImplementation(() =>
      Promise.resolve({
        gardenCoords: [{ lat: -36.86667, lon: 174.76667 }],
        addrs: ['address 1'],
        names: ['name 1'],
      })
    )
    let assert = null
    getUserLocation.mockImplementation((cbFunc, isMounted) => {
      assert = () => {
        expect(isMounted()).toBeFalsy()
      }
    })
    const { unmount } = renderWithRouter(<Home />)
    return screen.findAllByRole('img').then(() => {
      unmount()
      assert()
      return null
    })
  })
})
