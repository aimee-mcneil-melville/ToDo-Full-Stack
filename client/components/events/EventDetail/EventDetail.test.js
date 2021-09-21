import React from 'react'
import { screen, waitFor } from '@testing-library/dom'
import { getEvent } from '../../../pages/Event/eventHelper'
import { renderWithRedux } from '../../../test-utils'
import EventDetail from './EventDetail'

jest.mock('../../../pages/Event/eventHelper')

const mockData = {
  title: 'mock data',
  gardenName: 'test garden',
  gardenAddress: 'test Address',
  date: '01/01/0001',
  volunteersNeeded: 77,
  description: 'if you are in the next cohort and your in bug team, you cool <3'
}

describe('EventDetails testing', () => {
  it('should render correct data within components for admin', async () => {
    getEvent.mockImplementation(() => Promise.resolve(mockData))
    await waitFor(() => renderWithRedux(<EventDetail id={1} isAdmin={true} />))
    expect(screen.getByRole('eventTitle')).toHaveTextContent('mock data')
    expect(screen.getByRole('gardenName')).toHaveTextContent('test garden')
    expect(screen.getByRole('gardenAddress')).toHaveTextContent('test Address')
    expect(screen.getByRole('eventDate')).toHaveTextContent('01/01/0001')
    expect(screen.getByRole('volunteersNeeded')).toHaveTextContent('77')
    expect(screen.getByRole('description')).toHaveTextContent('if you are in the next cohort and your in bug team, you cool <3')
    expect(screen.getByRole('eventDetailsEditButton')).toBeInTheDocument()
    expect(screen.getByRole('eventDetailsAdminButton')).toBeInTheDocument()
  })

  it('should only render volunteer button instead of Edit and Admin button', async () => {
    getEvent.mockImplementation(() => Promise.resolve(mockData))
    await waitFor(() => renderWithRedux(<EventDetail id={1} isAdmin={false} />))
    expect(screen.getByRole('volunteerButton')).toBeInTheDocument()
  })
})
