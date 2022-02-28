import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Post from './Post'

describe('Post', () => {
  const createdOn = new Date((new Date()).getTime() - (1 * 86400000)).toLocaleDateString('en-NZ')
  const fakePost = {
    title: 'Lettuce Picking Season',
    createdOn: createdOn,
    content: 'test content',
    firstName: 'FirstName',
    lastName: 'LastName'
  }

  it('Print needed List of items amount', () => {
    render(<Post post={fakePost} />)
    const post = screen.getAllByRole('listitem')
    expect(post).toHaveLength(3)
    expect(post[0].textContent).toBe('By FirstName LastName:')
  })

  it('renders post data', async () => {
    render(<Post post={fakePost} />)
    const post = screen.getByText(/LastName/)
    const title = await screen.queryByText('Lettuce Picking Season')
    expect(post).toBeInTheDocument()
    expect(title).toBeNull()
  })

  it('Render correct relative time format', async () => {
    render(<Post post={fakePost} />)
    const createdOn = screen.getByText(/ago/)
    expect(createdOn).toBeInTheDocument()
  })
})
