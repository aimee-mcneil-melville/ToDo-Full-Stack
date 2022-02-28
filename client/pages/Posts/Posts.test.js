import React from 'react'
import { render, screen } from '@testing-library/react'
import PostList from '../../components/Posts/PostList'
import { getPosts } from './postsHelper'

jest.mock('./postsHelper')

afterEach(() => {
  getPosts.mockClear()
})

describe('List of posts', () => {
  const fakePost = [{
    id: 1,
    gardenId: 1,
    author: 2,
    title: 'test title1',
    createdOn: '21/02/2022',
    content: 'test1 content',
    firstName: 'test1 firstName',
    lastName: 'test1 lastName'
  }, {
    id: 2,
    gardenId: 1,
    author: 2,
    title: 'test title2',
    createdOn: '21/02/2022',
    content: 'test2 content',
    firstName: 'test2 firstName',
    lastName: 'test2 lastName'
  }]

  it('props send correct data', () => {
    const { getByText } = render(<PostList posts={fakePost} />)
    expect(getByText(/By test1 firstName/)).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeTruthy()
    return screen.findAllByRole('list')
      .then(listItem =>
        expect(listItem).toHaveLength(1)
      )
  })
})
