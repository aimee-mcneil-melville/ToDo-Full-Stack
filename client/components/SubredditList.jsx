import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post'

function Subreddit() {
  const subreddits = useSelector((state) => state.subreddits)
  return (
    <div>
      {subreddits.map((post, i) => (
        <Post key={i} title={post.title} />
      ))}
    </div>
  )
}

export default Subreddit
