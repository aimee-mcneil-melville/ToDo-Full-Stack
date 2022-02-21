import React from 'react'

export default function Post({ post }) {
    return (
        <>
            <li>By {post.firstName}  {post.lastName}:</li>
            <li>{post.content}</li>
            <li>createdOn :{post.createdOn}</li>
        </>
    )
}
