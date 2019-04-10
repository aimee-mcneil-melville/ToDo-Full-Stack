import React from 'react'
import {addCommentByPostId, updateComment} from '../api'

class CommentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: '',
      comment: props.comment || { comment: '' }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const {comment, match, fetchComments, history} = this.props
    if (comment) {
      updateComment(this.state.comment)
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
      <form className="comment-form pure-form" onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='comment'
          value={this.state.comment.comment}
          onChange={(e) => {
            const newComment = 
            {
              ...this.state.comment,
              [e.target.name]: e.target.value
            }
            
            this.setState({
              comment: newComment
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
