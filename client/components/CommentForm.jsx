import React from 'react'

import {addCommentByPostId, updateComment} from '../api'

class CommentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: null,
      comment: {
        id: null,
        comment: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.comment) {
      this.setState({comment: this.props.comment})
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    const {comment} = this.props
    this.setState({errorMessage: null})
    if (comment) {
      updateComment(this.state.comment)
        .then(() => this.props.fetchComments(comment.postId))
        .then(() => this.props.history.push(`/posts/${comment.postId}`))
        .catch(err => this.setState({errorMessage: err.message}))
    } else {
      addCommentByPostId(this.props.match.params.postId, this.state.comment)
        .then(() => this.props.fetchComments(this.props.match.params.postId))
        .then(() => this.props.history.push(`/posts/${this.props.match.params.postId}`))
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
          onChange={(e) => this.setState({
            comment: {
              comment: e.target.value,
              id: this.state.comment.id
            }
          })}
        />
        <input className='pure-button' type='submit' />
        {this.state.errorMessage && this.state.errorMessage}
      </form>
    )
  }
}

export default CommentForm

