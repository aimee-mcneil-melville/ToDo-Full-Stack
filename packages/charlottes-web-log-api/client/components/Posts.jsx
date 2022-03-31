import React from 'react'
import PostSummary from './PostSummary'
function Posts(props) {
  return (
    <div className="posts">
      <h1 className="content-subhead">Posts</h1>
      {props.posts?.map((post) => {
        return <PostSummary key={post.id} post={post} />
      })}
    </div>
  )
}

export default Posts
