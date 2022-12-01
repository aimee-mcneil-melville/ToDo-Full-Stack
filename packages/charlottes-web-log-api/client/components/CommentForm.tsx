import { useState, FormEvent } from 'react'
import { updateComment, addCommentByPostId } from '../api'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import { IFetchComments } from './hooks/useFetchComments'

interface IProps {
  comment?: string
  commentId?: number
  variant?: 'new' | 'edit'
  setEditing?: (_: boolean) => void
  fetchComments?: IFetchComments
}

function CommentForm(props: IProps) {
  const { id: postId } = useParams()
  const navigate = useNavigate()
  const { fetchComments } = useOutletContext<any>()
  const [newComment, setNewComment] = useState(props.comment || '')

  const onSubmit = (e: FormEvent<any>) => {
    e.preventDefault()
    if (props.variant === 'edit') {
      return updateComment(props.commentId!, newComment).then(() => {
        props.fetchComments!(Number(postId))
        props.setEditing!(false)
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
