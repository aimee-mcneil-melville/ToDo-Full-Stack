import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPosts } from './postsHelper'

import PostList from '../../components/Posts/PostList'

export default function Posts () {
  const { id } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getPosts(id)
      .then((post) => {
        setPosts(post)
        return null
      })
  }, [])

  return (
    <PostList posts={posts} />
  )
}
