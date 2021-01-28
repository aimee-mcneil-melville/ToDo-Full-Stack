import React, { useState } from 'react'
import { addCommentByPostId, updateComment } from '../api'

function CommentForm (props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [comment, setComment] = useState(props.comment || { comment: '' })

  function handleSubmit (e) {
    e.preventDefault()
    const { match, fetchComments, history } = props
    if (props.comment) {
      updateComment(comment)
        .then(() => fetchComments(comment.postId))
        .then(() => history.push(`/posts/${comment.postId}`))
        .catch(err => setErrorMessage(err.message))
    } else {
      addCommentByPostId(match.params.postId, comment)
        .then(() => fetchComments(match.params.postId))
        .then(() => history.push(`/posts/${match.params.postId}`))
        .catch(err => setErrorMessage(err.message))
    }
  }

  return (
    <form className="comment-form pure-form" onSubmit={handleSubmit}>
      <input
        type='text'
        name='comment'
        value={comment.comment}
        onChange={(e) => {
          setComment({ ...comment, [e.target.name]: e.target.value })
        }}
      />
      <input className='pure-button' type='submit' />
      <p>{errorMessage && errorMessage}</p>
    </form>
  )
}

export default CommentForm
