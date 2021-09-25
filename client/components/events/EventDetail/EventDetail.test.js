import React from 'react'
import { screen, waitFor, within } from '@testing-library/dom'
import { getEvent } from '../../../pages/Event/eventHelper'
import { renderWithRouter } from '../../../test-utils'
import EventDetail from './EventDetail'

jest.mock('../../../pages/Event/eventHelper')

const mockData = {
  title: 'mock data',
  gardenName: 'test garden',
  gardenAddress: 'test Address',
  date: '01/01/0001',
  volunteersNeeded: 77,
  description: 'if you are in the next cohort and your in bug team, you cool <3',
  status: 'active'
}

const mockAdminUser = {
  isAdmin: true
}

const mockUser = {
  isAdmin: false
}

describe('EventDetails testing', () => {
  it('should render correct data within components for admin', async () => {
    getEvent.mockImplementation(() => Promise.resolve(mockData))

    await waitFor(() => renderWithRouter(<EventDetail id={1} user={mockAdminUser} />))

    expect(screen.getByRole('heading')).toHaveTextContent('mock data')
    const list = screen.getByRole('list')
    const { getAllByRole } = within(list)
    const items = getAllByRole('listitem')
    expect(items).toHaveLength(6)
    const listItems = items.map(item => item.textContent)
    expect(listItems).toEqual([
      'test garden',
      'test Address',
      '01/01/0001',
      'Volunteers Needed: 77',
      'if you are in the next cohort and your in bug team, you cool <3',
      'Event is active'
    ])
  })

  it('should only render Edit and Admin buttons', async () => {
    getEvent.mockImplementation(() => Promise.resolve(mockData))
    await waitFor(() => renderWithRouter(<EventDetail id={1} user={mockAdminUser} />))
    const buttons = screen.getAllByRole('button').map(b => b.textContent)
    expect(buttons).toEqual(['Edit Event', 'Event Admin'])
  })

  it('should only render volunteer button', async () => {
    getEvent.mockImplementation(() => Promise.resolve(mockData))
    await waitFor(() => renderWithRouter(<EventDetail id={1} user={mockUser} />))
    const buttonName = screen.getByRole('button').textContent
    expect(buttonName).toEqual('Volunteer')
  })
})
