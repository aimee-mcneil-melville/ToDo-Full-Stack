import React from 'react'
import { Link, Route } from 'react-router-dom'

import Comment from './Comment'
import CommentForm from './CommentForm'
function Comments(props) {
  const { postId, comments, fetchComments } = props
  return (
    <div>
      <p>
        <Link className="pure-button" to={`/posts/${postId}/comments/new`}>
          Add A New Comment
        </Link>
      </p>
      <Route
        path="/posts/:postId/comments/new"
        render={(props) => (
          <CommentForm fetchComments={fetchComments} {...props} />
        )}
      />
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            postId={postId}
            comment={comment}
            fetchComments={fetchComments}
          />
        ))}
      </div>
    </div>
  )
}

Comments.defaultProps = {
  comments: [],
}

export default Comments
