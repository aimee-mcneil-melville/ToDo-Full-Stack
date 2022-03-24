import { useState, useEffect } from 'react'
import { getCommentsByPostId } from '../../api'

function useFetchComments(id) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function fetchComments(id) {
    setLoading(true)
    setError('')
    getCommentsByPostId(id)
      .then((comments) => {
        setComments(comments)
        return null
      })
      .finally(() => setLoading(false))
      .catch((err) => {
        setError(err.message)
      })
  }

  useEffect(() => {
    fetchComments(id)
  }, [id])

  return { comments, loading, error, fetchComments }
}

export default useFetchComments
