import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'

import CommentForm from './CommentForm'
import {deleteComment} from '../api'

class Comments extends React.Component {
  deleteComment () {
    deleteComment(this.props.comment.id)
      .then(() => this.props.fetchComments(this.props.postId))
  }

  render () {
    const comment = this.props.comment
    return (
      <div>
        <Switch>
          <Route path={`/posts/${this.props.postId}/comments/${comment.id}`}
            render={(props) =>
              <CommentForm
                fetchComments={this.props.fetchComments}
                comment={comment}
                postId={this.props.postId}
                {...props}
              />
            }
          />
          <Route path={`/posts/${this.props.postId}`}
            render={props =>
              <div>
                <li key={comment.id}>{comment.comment}</li>
                <Link to={`/posts/${this.props.postId}/comments/${comment.id}`}>
                  <button className='pure-button'>Edit</button>
                </Link>
                <button className='pure-button'
                  onClick={this.deleteComment.bind(this)}>Delete</button>
              </div>
            }
          />
        </Switch>
      </div>
    )
  }
}

export default Comments

