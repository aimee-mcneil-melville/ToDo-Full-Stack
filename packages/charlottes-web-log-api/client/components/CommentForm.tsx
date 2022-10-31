import { useState } from 'react'
import { updateComment, addCommentByPostId } from '../api'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import { IUseFetchPosts } from './hooks/useFetchPosts'

interface IProps {
  comment: string
  commentId: number
  variant?: 'new' | 'edit'
  setEditing: (_: boolean) => void
}

function CommentForm(props: IProps) {
  const { id: postId } = useParams()
  const navigate = useNavigate()
  const { fetchComments } = useOutletContext<IUseFetchPosts>()
  const [newComment, setNewComment] = useState(props.comment || '')

  const onSubmit = (e) => {
    e.preventDefault()
    if (props.variant === 'edit') {
      return updateComment(props.commentId, newComment).then(() => {
        props.fetchComments(postId)
        props.setEditing(false)
      })
    } else if (props.variant === 'new') {
      return addCommentByPostId(Number(postId), newComment).then(() => {
        fetchComments(postId)
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
