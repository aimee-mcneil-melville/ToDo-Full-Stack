import { useState, useEffect } from 'react'
import { getCommentsByPostId } from '../../api'
import { Comment } from '../../common/Comment'

// eslint-disable-next-line no-unused-vars
export type FetchComments = (id: number) => void

function useFetchComments(id: number) {
  const [comments, setComments] = useState([] as Comment[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function fetchComments(id: number) {
    setLoading(true)
    setError('')
    getCommentsByPostId(id)
      .then((comments) => {
        setComments(comments)
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
