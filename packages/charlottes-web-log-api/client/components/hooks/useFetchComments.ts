import { useState, useEffect } from 'react'
import { getCommentsByPostId } from '../../api'
import { IComment } from '../../IComment'

// eslint-disable-next-line no-unused-vars
export type IFetchComments = (id: number) => void

function useFetchComments(id: number) {
  const [comments, setComments] = useState([] as IComment[])
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
