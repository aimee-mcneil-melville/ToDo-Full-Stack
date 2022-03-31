import { useState, useEffect } from 'react'
import { getPosts } from '../../api'

function useFetchPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  function fetchPosts() {
    setLoading(true)
    setError('')
    getPosts()
      .then((posts) => {
        setPosts(posts)
        return null
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
