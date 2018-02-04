import React from 'react'
import {Link, Route} from 'react-router-dom'

import Comment from './Comment'
import CommentForm from './CommentForm'

class Comments extends React.Component {
  render () {
    return (
      <div>
        <Link className='pure-button' to={`/posts/${this.props.postId}/comments/new`}>Add A New Comment</Link>
        <Route
          path='/posts/:postId/comments/new'
          render={(props) =>
            <CommentForm
              fetchComments={this.props.fetchComments}
              {...props}
            />
          }
        />
        <ul>
          {this.props.comments.map(comment =>
            <Comment
              key={comment.id}
              postId={this.props.postId}
              comment={comment}
              fetchComments={this.props.fetchComments}
            />
          )}
        </ul>
      </div>
    )
  }
}

Comments.defaultProps = {
  comments: []
}

export default Comments

