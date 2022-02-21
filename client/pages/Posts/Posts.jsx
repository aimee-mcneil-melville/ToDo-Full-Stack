import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPosts } from './postsHelper'

import PostList from "../../components/Posts/PostList"

export default function Posts() {
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  const user = useSelector(globalState => globalState.user)

  useEffect(() => {
    getPosts(id)
      .then((post) => {
        setPosts(post)
        return null
      })
  }, [user])


  return (
    <PostList posts={posts} />
  )
}
