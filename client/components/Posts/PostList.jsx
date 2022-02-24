import React from 'react'
import Post from './Post'

export default function PostList ({ posts }) {
  return (
    <ul className='list-primary'>
      {posts.map(post =>
        <Post
          post={post}
          key={post.id}
        />
      )}
    </ul>
  )
}
