import React from 'react'

import {addPost, updatePost} from '../api'

class PostForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: null,
      title: '',
      paragraphs: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    const {post} = this.props
    if (post) {
      const paragraphs = {paragraphs: post.paragraphs.join('\n')}
      this.setState(Object.assign({}, post, paragraphs))
    }
  }

  componentWillReceiveProps (nextProps) {
    const {post} = nextProps
    if (post && !this.props.post) {
      const paragraphs = {paragraphs: post.paragraphs.join('\n')}
      this.setState(Object.assign({}, post, paragraphs))
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({errorMessage: null})
    const {post} = this.props
    if (post) {
      updatePost(this.state)
        .then(() => this.props.fetchPosts())
        .then(() => this.props.history.push(`/posts/${post.id}`))
        .catch(err => this.setState({errorMessage: err.message}))
    } else {
      addPost(this.state)
        .then((newPost) => {
          this.props.fetchPosts()
          .then(() => this.props.history.push(`/posts/${newPost.id}`))
        })
        .catch(err => this.setState({ errorMessage: err.message }))
    }
  }

  render () {
    return (
      <form
        className='pure-form pure-form-aligned'
        onSubmit={this.handleSubmit}>

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
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div className='pure-control-group'>
            <label htmlFor='paragraphs'>Blog</label>
            <textarea
              name='paragraphs'
              value={this.state.paragraphs}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className='pure-controls'>
            <input className='pure-button' type='submit' />
          </div>
        </fieldset>

        {this.state.errorMessage && this.state.errorMessage}
      </form>
    )
  }
}

export default PostForm

