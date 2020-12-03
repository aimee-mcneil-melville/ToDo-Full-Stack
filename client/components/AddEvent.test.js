import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import AddEvent from './AddEvent'
import { renderWithRedux } from '../test-utils'

jest.mock('../api/events', () => {
  return {
    addEvent: () => Promise.resolve()
  }
})

describe('Adding a new event', () => {
  it('Redirects to /garden', () => {
    const fakeHistory = []
    const { getByRole } = renderWithRedux(<AddEvent history={fakeHistory} />)
    const addButton = getByRole('button')
    fireEvent.click(addButton)
    return waitFor(() => expect(fakeHistory).toHaveLength(1))
      .then(() => expect(fakeHistory[0]).toBe('/garden'))
  })
})
