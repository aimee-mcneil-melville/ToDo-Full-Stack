import React from 'react'
import { fireEvent } from '@testing-library/react'
import AddEvent from './AddEvent'
import { renderWithRedux } from '../test-utils'

describe('Adding a new event', () => {
  it('Redirects to /garden', () => {
    const fakeHistory = {
      push: jest.fn()
    }
    const { getByRole } = renderWithRedux(<AddEvent history={fakeHistory} />)
    const addButton = getByRole('button')
    fireEvent.click(addButton)
    expect(fakeHistory.push).toHaveBeenCalledWith('/garden')
  })
})
