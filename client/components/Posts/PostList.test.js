import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import PostList from './PostList'

describe('PostList', () => {
  const fakePost = [{
    title: 'Lettuce Picking Season',
    createdOn: '01/01/2222',
    content: 'test content',
    firstName: 'Test fistName',
    lastName: 'Test LastName'
  }, {
    title: 'cat jumping',
    createdOn: '01/01/2222',
    content: 'test content2',
    firstName: 'Test fistName2',
    lastName: 'Test LastName2'
  }]

  it('Print needed List of items amount', () => {
    render(<PostList posts={fakePost} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(6)
  })

  it('renders post data', async () => {
    render(<PostList posts={fakePost} />)
    expect(screen.getByText(/Test LastName2/)).toBeInTheDocument()
    expect(await screen.queryByText('Lettuce Picking Season')).toBeNull()
  })
})
