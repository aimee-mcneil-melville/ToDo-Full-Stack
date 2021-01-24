import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithRouter } from '../test-utils'

import EventItem from './EventItem'

describe('Edit Event button', () => {
  it('displays for admin', () => {
    renderWithRouter(<EventItem isAdmin={true} event={{}}/>)
    expect(screen.getByRole('link')).toHaveTextContent('Edit Event')
  })

  it('does not display if not an admin', () => {
    renderWithRouter(<EventItem isAdmin={false} event={{}}/>)
    expect(screen.queryByRole('link')).toBeNull()
  })
})
