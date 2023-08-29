import { useState } from 'react'
import { deleteComment } from '../api/index.ts'
import CommentForm from './CommentForm.tsx'
import { Comment as CommentData } from '../../models/comment.ts'
import { FetchComments } from './hooks/useFetchComments.ts'

interface Props {
  comment: CommentData
  fetchComments: FetchComments
}

function Comment({ comment, fetchComments }: Props) {
  const [editing, setEditing] = useState(false)

  return editing ? (
    <CommentForm
      commentId={comment.id}
      comment={comment.comment}
      setEditing={setEditing}
      variant="edit"
    />
  ) : (
    <div className="comment" key={comment.id}>
      <p>
        <span className="comment-content">{comment.comment}</span>
        <span className="comment-date">
          Date Posted: {new Date(comment.dateCreated).toDateString()}
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
            e.preventDefault()
            if (!comment.id) return
            deleteComment(comment.id)
              .then(() => fetchComments(comment.postId))
              .catch((err) => console.log(err))
          }}
        >
          Delete
        </button>
      </p>
    </div>
  )
}

export default Comment
