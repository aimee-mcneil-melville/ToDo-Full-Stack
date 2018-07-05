import React from 'react'

import Post from './Post'

function Posts (props) {
  return (
    <div className='posts'>
      <h1 className='content-subhead'>Posts</h1>
      {props.posts.map(post => {
        return <Post
          key={post.id}
          post={post}
          fetchPosts={props.fetchPosts}
          path={props.location.pathname}
        />
      })}
    </div>
  )
}

Posts.defaultProps = {
  posts: []
}

export default Posts
