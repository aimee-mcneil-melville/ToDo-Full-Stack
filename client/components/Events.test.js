import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Events from './Events'
import { renderWithRedux } from '../test-utils'

test('events show add event button for admin', () => {
  renderWithRedux(<Events events={[]}/>, {
    initialState: { user: { isAdmin: true } }
  })
  expect(screen.getByRole('link')).toHaveTextContent('Add New Event')
})

test('events hide add event button for member', () => {
  renderWithRedux(<Events events={[]}/>)
  expect(screen.queryByRole('link')).toBeNull()
})
