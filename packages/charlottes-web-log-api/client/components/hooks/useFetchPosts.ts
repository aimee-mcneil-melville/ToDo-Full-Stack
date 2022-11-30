import { useState, useEffect } from 'react'
import { getPosts } from '../../api'
import { IPost } from '../../IPost'

// eslint-disable-next-line no-unused-vars
export type IFetchPosts = (id: number) => void
export type IUseFetchPosts = ReturnType<typeof useFetchPosts>

function useFetchPosts() {
  const [posts, setPosts] = useState([] as IPost[])
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
