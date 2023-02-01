import { useState, FormEvent } from 'react'
import { updateComment, addCommentByPostId } from '../api'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import { FetchComments } from './hooks/useFetchComments'

interface Props {
  comment?: string
  commentId?: number
  variant: string
  setEditing?: (_: boolean) => void
}

function CommentForm(props: Props) {
  const { id: postId } = useParams()
  const navigate = useNavigate()
  const { fetchComments } = useOutletContext() as {
    fetchComments: FetchComments
  }
  const [newComment, setNewComment] = useState(props.comment || '')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (props.variant === 'edit') {
      return updateComment(props.commentId!, newComment).then(() => {
        fetchComments(Number(postId))
        props.setEditing && props.setEditing(false)
      })
    } else if (props.variant === 'new') {
      return addCommentByPostId(Number(postId), newComment).then(() => {
        fetchComments(Number(postId))
        setNewComment('')
        navigate(`/posts/${postId}`)
      })
    }
  }

  return (
    <form className="comment-form pure-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <input className="pure-button" type="submit" />
    </form>
  )
}

export default CommentForm
