import React from 'react'
import Post from './Post'

export default function PostList({ posts }) {

    return (
        <ul>
            {posts.map(post => {
                return (
                    <Post post={post} key={post.id} />

                )

            })}
        </ul>
    )
}
