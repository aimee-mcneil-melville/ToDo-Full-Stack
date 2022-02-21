import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithRedux } from '../../test-utils'
import PostList from "../../components/Posts/PostList"
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
        title: "test title1",
        createdOn: "21/02/2022",
        content: "test1",
        firstName: "test1",
        lastName: "test1"
    }, {
        id: 2,
        gardenId: 1,
        author: 2,
        title: "test title2",
        createdOn: "21/02/2022",
        content: "test2",
        firstName: "test2",
        lastName: "test2"
    }]


    it('props send correct data', () => {
        const { getByText } = render(<PostList posts={fakePost} />)
        expect(getByText('test2')).toBeInTheDocument()
        expect(screen.getByRole('list')).toBeTruthy()
        return screen.findAllByRole('list')
            .then(listItem =>
                expect(listItem).toHaveLength(1)
            )

    })


    // // this test if we didn put ((posts|| []).map(...)) .PostList didn't work
    // it('displays information corrctly when array is empty', () => {
    //     const { getByText }  = render(<PostList />)

    //     expect(getByText('list')).toBeNull()
    // })
})