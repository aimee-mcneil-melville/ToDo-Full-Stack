import React from 'react'
import {Link, Route} from 'react-router-dom'

import Comment from './Comment'
import CommentForm from './CommentForm'

class Comments extends React.Component {
  render () {
    const {postId, comments, fetchComments} = this.props
    return (
      <div>
        <Link
          className='pure-button'
          to={`/posts/${postId}/comments/new`}>
          Add A New Comment
        </Link>
        <Route
          path='/posts/:postId/comments/new'
          render={props => (
            <CommentForm
              fetchComments={fetchComments}
              {...props}
            />
          )}
        />
        <ul>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              postId={postId}
              comment={comment}
              fetchComments={fetchComments}
            />
          ))}
        </ul>
      </div>
    )
  }
}

Comments.defaultProps = {
  comments: []
}

export default Comments
