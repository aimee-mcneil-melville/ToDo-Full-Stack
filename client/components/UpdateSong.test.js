import React from 'react'
import { renderWithRedux } from '../testUtils'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import UpdateSong from './UpdateSong'

test('Display message when song Id is not valid', () => {
  renderWithRedux(<UpdateSong/>,
    {
      initialEntries: ['/songs/update/5'],
      route: '/songs/update/:id'
    })
  return screen.findByText('Song does not exist.')
    .then(paragraph => {
      expect(paragraph).toBeVisible()
      return null
    })
})

test('Display artist name', () => {
  renderWithRedux(<UpdateSong/>,
    {
      initialEntries: ['/songs/update/2'],
      route: '/songs/update/:id'
    })
  return screen.findByDisplayValue('Tigercub')
    .then(value => {
      expect(value).toBeVisible()
      return null
    })
})
