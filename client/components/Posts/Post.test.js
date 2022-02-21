import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'


import Post from './Post'

describe('Post', () => {
    const fakePost = {
        title: "Lettuce Picking Season",
        createdOn: "01/01/2222",
        content: "test content",
        firstName: "Test fistName",
        lastName: "Test LastName"
    }

    it('Print needed List of items amount', () => {
        render(<Post post={fakePost} />)
        expect(screen.getAllByRole('listitem')).toHaveLength(3)
    })

    it("renders post data", async () => {
        render(<Post post={fakePost} />)
        expect(screen.getByText(/Test LastName/)).toBeInTheDocument();
        expect(await screen.queryByText("Lettuce Picking Season")).toBeNull()

    })
})
