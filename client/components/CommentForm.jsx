import React, { useState } from 'react'
import { updateComment, addCommentByPostId } from '../api'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'

function CommentForm(props) {
  const { id: postId } = useParams()
  const navigate = useNavigate()
  const { fetchComments } = useOutletContext()
  const [newComment, setNewComment] = useState(props.comment || { comment: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    if (props.variant === 'edit') {
      return updateComment(newComment).then(() => {
        props.fetchComments(newComment.postId)
        props.setEditing(false)
        return null
      })
    } else if (props.variant === 'new') {
      return addCommentByPostId(postId, newComment).then(() => {
        fetchComments(postId)
        setNewComment({ comment: '' })
        navigate(`/posts/${postId}`)
        return null
      })
    }
  }

  return (
    <form className="comment-form pure-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="comment"
        value={newComment.comment}
        onChange={(e) =>
          setNewComment({
            ...newComment,
            [e.target.name]: e.target.value,
          })
        }
      />
      <input className="pure-button" type="submit" />
    </form>
  )
}

export default CommentForm
