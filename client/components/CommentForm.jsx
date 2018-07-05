import React from 'react'
import {addCommentByPostId, updateComment} from '../api'

class CommentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: '',
      comment: props.comment
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const {comment, match, fetchComments, history} = this.props
    if (comment) {
      updateComment(this.state)
        .then(() => fetchComments(comment.postId))
        .then(() => history.push(`/posts/${comment.postId}`))
        .catch(err => this.setState({errorMessage: err.message}))
    } else {
      addCommentByPostId(match.params.postId, this.state.comment)
        .then(() => fetchComments(match.params.postId))
        .then(() => history.push(`/posts/${match.params.postId}`))
        .catch(err => this.setState({errorMessage: err.message}))
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='comment'
          value={this.state.comment.comment}
          onChange={(e) => {
            this.setState({
              comment: {comment: e.target.value}
            })
          }}
        />
        <input className='pure-button' type='submit' />
        <p>{this.state.errorMessage && this.state.errorMessage}</p>
      </form>
    )
  }
}

export default CommentForm
