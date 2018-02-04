import React from 'react'
import {Link} from 'react-router-dom'

import Comments from './Comments'
import {deletePost, getCommentsByPostId} from '../api'

class Post extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: '',
      comments: []
    }
    this.deletePost = this.deletePost.bind(this)
    this.fetchComments = this.fetchComments.bind(this)
  }

  componentDidMount () {
    const id = this.props.post.id || this.props.match.params.id
    if (id) {
      this.fetchComments(id)
    }
  }

  fetchComments (postId) {
    getCommentsByPostId(postId)
      .then((comments) => this.setState({ comments: comments }))
      .catch((err) => this.setState({ errorMessage: err.message }))
  }

  deletePost () {
    deletePost(this.props.post.id)
      .then(() => this.props.fetchPosts())
      .catch(err => this.setState({ errorMessage: err.message }))
  }

  render () {
    const {title, dateCreated, id} = this.props.post
    return (
      <div className='post'>
        <Link to={`/posts/${id}`}>
          <header className='post-header'>
            <h2 className='post-title'>{title}</h2>
            <p className='post-meta'>
                Date Created: {dateCreated}
            </p>
          </header>
        </Link>
        {this.props.post.paragraphs.map((para, key) => {
          return (
            <p key={key}>{para}</p>
          )
        })}
        <div className='pure-button-group' role='group'>
          <Link to={`/posts/edit/${id}`}>
            <button className='button-secondary pure-button'>Edit</button>
          </Link>
          <button className='button-error pure-button' onClick={this.deletePost}>Delete</button>
        </div>

        <Link to={`/posts/${id}`}>
          <div className='comment-count'>{this.state.comments.length} comments</div>
        </Link>
        {this.props.path !== '/' &&
          <Comments
            comments={this.state.comments}
            postId={id}
            fetchComments={this.fetchComments}
          />
        }

        {this.state.errorMessage &&
          this.state.errorMessage
        }
      </div>
    )
  }
}

Post.defaultProps = {
  post: {
    title: '',
    date: '',
    id: null,
    paragraphs: []
  }
}

export default Post

