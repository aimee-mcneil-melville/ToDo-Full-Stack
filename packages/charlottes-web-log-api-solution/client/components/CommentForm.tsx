import { useState, FormEvent } from 'react'
import { updateComment, addCommentByPostId } from '../api/index.ts'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import { FetchComments } from './hooks/useFetchComments.ts'

interface Props {
  comment?: string
  commentId?: number
  variant: 'new' | 'edit'
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
    if (props.variant === 'edit' && props.commentId) {
      updateComment(props.commentId, newComment)
        .then(() => {
          fetchComments(Number(postId))
          props.setEditing && props.setEditing(false)
        })
        .catch((err) => console.log(err))
    } else if (props.variant === 'new') {
      addCommentByPostId(Number(postId), newComment)
        .then(() => {
          fetchComments(Number(postId))
          setNewComment('')
          navigate(`/posts/${postId}`)
        })
        .catch((err) => console.log(err))
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
