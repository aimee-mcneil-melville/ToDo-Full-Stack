import React from 'react'

export default function Post({ post }) {
    return (
        <>
            <h2>By {post.firstName}  {post.lastName}:</h2>
            <p>{post.content}</p>
            <span>createdOn :{post.createdOn}</span>
        </>
    )
}
