import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../test-utils'

import GardenList from './GardenList'
import { getAllGardens } from './gardernListHelper'

jest.mock('./gardernListHelper')

afterEach(() => {
  getAllGardens.mockClear()
})

describe('list of gardens', () => {
  it('displays information corrctly when array is empty', async () => {
    getAllGardens.mockImplementation(() => {
      return Promise.resolve([])
    })

    renderWithRouter(<GardenList />)

    expect(screen.queryByRole('listitem')).toBeNull()

    // const listItems = await screen.queryByRole('listitem')
    // console.log(listItems)
    // expect(listItems).toBeNull()
  })

  it('displays information corrctly when array has one object', () => {
    getAllGardens.mockImplementation(() => {
      return Promise.resolve([
        {
          id: 0,
          name: 'Test Garden',
          address: '123 Sesame St',
          description: 'A test run garden for testing out gardening.',
          lat: 123,
          lon: 321,
          url: 'https://www.google.com/'
        }
      ])
    })

    renderWithRouter(<GardenList />)

    return screen.findAllByRole('listitem')
      .then((listItems) => {
        expect(listItems).toHaveLength(1)
        expect(listItems[0].textContent).toMatch('Test Garden')
        expect(listItems[0].textContent).toMatch('Address: 123 Sesame St')
        expect(listItems[0].textContent).toMatch('A test run garden for testing out gardening.')
        expect(getAllGardens).toHaveBeenCalledTimes(1)
        return null
      })
  })

  it('displays information corrctly when array has more than one object', () => {
    getAllGardens.mockImplementation(() => {
      return Promise.resolve([
        {
          id: 0,
          name: 'Test Garden',
          address: '123 Sesame St',
          description: 'A test run garden for testing out gardening.',
          lat: 123,
          lon: 321,
          url: 'https://www.google.com/'
        },
        {
          id: 1,
          name: 'Test Garden 2',
          address: '234 Sesame St',
          description: 'A second test run garden for testing out gardening.',
          lat: 234,
          lon: 432,
          url: 'https://www.google.com/'
        }
      ])
    })

    renderWithRouter(<GardenList />)

    return screen.findAllByRole('listitem')
      .then((listItems) => {
        expect(listItems).toHaveLength(2)
        expect(listItems[0].textContent).toMatch('Test Garden')
        expect(listItems[0].textContent).toMatch('Address: 123 Sesame St')
        expect(listItems[0].textContent).toMatch('A test run garden for testing out gardening.')
        expect(listItems[1].textContent).toMatch('Test Garden 2')
        expect(listItems[1].textContent).toMatch('Address: 234 Sesame St')
        expect(listItems[1].textContent).toMatch('A second test run garden for testing out gardening.')
        expect(getAllGardens).toHaveBeenCalledTimes(1)
        return null
      })
  })
})
