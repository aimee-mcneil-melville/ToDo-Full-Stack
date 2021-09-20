import React from 'react'
import { renderWithRedux } from '../testUtils'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import AddSong from './AddSong'

test('Display text of h1 tag', () => {
  renderWithRedux(<AddSong/>,
    {
      initialEntries: ['/songs/add'],
      route: '/songs/add'
    })
  return screen.findByText('Add new song')
    .then(paragraph => {
      expect(paragraph).toBeVisible()
      return null
    })
})
