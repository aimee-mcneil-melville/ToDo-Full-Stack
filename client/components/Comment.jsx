import React, { useState } from 'react'
import { deleteComment } from '../api'
import CommentForm from './CommentForm'

function Comment(props) {
  const { comment, fetchComments } = props
  const [editing, setEditing] = useState(false)

  return editing ? (
    <CommentForm
      comment={comment}
      setEditing={setEditing}
      variant="edit"
      fetchComments={fetchComments}
    />
  ) : (
    <div className="comment" key={comment.id}>
      <p>
        <span className="comment-content">{comment.comment}</span>
        <span className="comment-date">
          Date Posted: {new Date(comment.datePosted).toDateString()}
        </span>

        <button
          className="pure-button button-secondary"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>

        <button
          className="pure-button button-error"
          onClick={(e) => {
            console.log('delete comment', comment.id)
            e.preventDefault()
            return deleteComment(comment.id).then(() => {
              fetchComments(comment.postId)
              return null
            })
          }}
        >
          Delete
        </button>
      </p>
    </div>
  )
}

export default Comment
