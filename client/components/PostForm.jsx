import React from 'react'
import {addPost, updatePost} from '../api'

class PostForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: '',
      post: {
        title: '',
        paragraphs: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const {post} = this.props
    if (post) this.setNewPost(post)
  }

  componentWillReceiveProps (nextProps) {
    const {post} = nextProps
    if (post && !this.props.post) this.setNewPost(post)
  }

  setNewPost (post) {
    const paragraphs = {
      paragraphs: post.paragraphs.join('\n')
    }
    this.setState({
      post: Object.assign({}, post, paragraphs)
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const {post, history, fetchPosts} = this.props

    if (post) {
      updatePost(this.state.post)
        .then(fetchPosts)
        .then(navigateToPost(post.id))
        .catch(err => this.setState({errorMessage: err.message}))
    } else {
      addPost(this.state.post)
        .then(newPost => {
          fetchPosts()
            .then(navigateToPost(newPost.id))
        })
        .catch(err => this.setState({errorMessage: err.message}))
    }

    function navigateToPost (id) {
      return () => history.push(`/posts/${id}`)
    }
  }

  handleChange (e) {
    const newPost = {
      ...this.state.post,
      [e.target.name]: e.target.value
    }
    
    this.setState({
      post: newPost
    })
  }

  render () {
    return (
      <form className='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
        {this.props.post
          ? <h2 className='post-title'>Edit Post</h2>
          : <h2 className='post-title'>Add a New Blog Post</h2>
        }

        <fieldset>
          <div className='pure-control-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              value={this.state.post.title}
              onChange={this.handleChange}
            />
          </div>

          <div className='pure-control-group'>
            <label htmlFor='paragraphs'>Blog</label>
            <textarea
              name='paragraphs'
              value={this.state.post.paragraphs}
              onChange={this.handleChange}>
            </textarea>
          </div>

          <div className='pure-controls'>
            <input className='pure-button' type='submit' />
          </div>
        </fieldset>

        <p>{this.state.errorMessage && this.state.errorMessage}</p>
      </form>
    )
  }
}

export default PostForm
