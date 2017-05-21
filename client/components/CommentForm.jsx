import React from 'react'
import { addCommentByPostId, updateComment } from '../api'

class CommentForm extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      comment: {
        id: null,
        comment: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount() {
    if (this.props.comment) {
      this.setState({ comment: this.props.comment })
    }
  }
  
  handleSubmit (e) {
    e.preventDefault()
    const {comment} = this.props
    if (comment) {
      updateComment(this.state.comment)
      .then(() => this.props.fetchComments(this.props.comment.postId))
      .then(() => this.props.history.push(`/posts/${this.props.comment.postId}`))
    } else {
      addCommentByPostId(this.props.match.params.postId, this.state.comment)
        .then(() => this.props.fetchComments(this.props.match.params.postId))
        .then(() => this.props.history.push(`/posts/${this.props.match.params.postId}`))
    }
  }
   
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text' 
          name='comment' 
          value={this.state.comment.comment} 
          onChange={(e) => this.setState({ comment: { comment: e.target.value, id: this.state.comment.id } })}
        />
        <input className='pure-button' type='submit' />
      </form>
    )
  }
}

export default CommentForm