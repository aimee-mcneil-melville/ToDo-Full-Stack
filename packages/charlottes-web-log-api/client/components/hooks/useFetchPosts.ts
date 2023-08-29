import { useState, useEffect } from 'react'
import { getPosts } from '../../api/index.ts'
import { Post } from '../../../models/post.ts'

export type FetchPosts = (id: number) => void
export type UseFetchPosts = ReturnType<typeof useFetchPosts>

function useFetchPosts() {
  const [posts, setPosts] = useState([] as Post[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function fetchPosts() {
    setLoading(true)
    setError('')

    getPosts()
      .then((posts) => {
        setPosts(posts)
      })
      .finally(() => setLoading(false))
      .catch((err) => {
        setError(err.message)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return { posts, loading, error, fetchPosts }
}

export default useFetchPosts
