import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import { deleteComment } from '../api'

function Comment (props) {
  function handleDeleteComment () {
    return deleteComment(props.comment.id)
      .then(() => props.fetchComments(props.postId))
  }

  const { postId, comment, fetchComments } = props
  return (
    <div>
      <Switch>
        <Route
          path={`/posts/${postId}/comments/${comment.id}`}
          render={(props) =>
            <CommentForm
              fetchComments={fetchComments}
              comment={comment}
              postId={postId}
              {...props}
            />
          }
        />
        <Route
          path={`/posts/${postId}`}
          render={props => (
            <div className="comment" key={comment.id}>
              <p>
                <span className="comment-content">{comment.comment}</span>
                <span className="comment-date">Date Posted: {new Date(comment.datePosted).toDateString()}</span>

                <Link to={`/posts/${postId}/comments/${comment.id}`}>
                  <button className='pure-button'>Edit</button>
                </Link>

                <button
                  className='pure-button'
                  onClick={handleDeleteComment}>
                  Delete
                </button>
              </p>
            </div>
          )}
        />
      </Switch>
    </div>
  )
}

export default Comment
