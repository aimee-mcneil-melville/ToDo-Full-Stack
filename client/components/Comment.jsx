import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import CommentForm from './CommentForm'

import {deleteComment} from '../api'

class Comments extends React.Component {
  constructor (props) {
    super(props)
    this.deleteComment = this.deleteComment.bind(this)
  }

  deleteComment () {
    deleteComment(this.props.comment.id)
      .then(() => this.props.fetchComments(this.props.postId))
  }

  render () {
    const {postId, comment, fetchComments} = this.props
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
              <div>
                <li key={comment.id}>{comment.comment}</li>
                <Link to={`/posts/${postId}/comments/${comment.id}`}>
                  <button className='pure-button'>Edit</button>
                </Link>
                <button
                  className='pure-button'
                  onClick={this.deleteComment}>
                  Delete
                </button>
              </div>
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default Comments
