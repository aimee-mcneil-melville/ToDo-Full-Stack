import React from 'react'
import { addPost, updatePost } from '../api'

class PostForm extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      paragraphs: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentWillMount () {
    const {post} = this.props
    if (post) {
      this.setState(Object.assign({}, post, {paragraphs: post.paragraphs.join('\n')}))
    }
  }
  
  componentWillReceiveProps (nextProps) {
    const {post} = nextProps
    if (post && !this.props.post) {
      this.setState(Object.assign({}, post, {paragraphs: post.paragraphs.join('\n')}))
    }
  }
  
  handleSubmit (e) {
    e.preventDefault()
    const {post} = this.props
    if (post) {
      updatePost(this.state)
        .then(() => this.props.fetchPosts())
        .then(() => this.props.history.push(`/posts/${post.id}`))
    } else {
      addPost(this.state)
        .then((newPost) => { 
          this.props.fetchPosts()
          .then(() => this.props.history.push(`/posts/${newPost.id}`))
        })
    }
  }
   
  render () {
    return (
      <form className='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
        {this.props.post &&
          <h2 className='post-title'>Edit Post</h2>
        }
        {!this.props.post &&
          <h2 className='post-title'>Add a New Blog Post</h2>
        }
        
        <fieldset>
          <div className='pure-control-group'>
           <label htmlFor='title'>Title</label>
           <input 
             type='text' 
             name='title' 
             value={this.state.title} 
             onChange={(e) => this.setState({ title: e.target.value })}
           />
         </div>
         
         <div className='pure-control-group'>
            <label htmlFor='paragraphs'>Blog</label>
            <textarea
              name='paragraphs'
              value={this.state.paragraphs}
              onChange={(e) => this.setState({ paragraphs: e.target.value })}
            ></textarea>
          </div>

          <div className='pure-controls'>
            <input className='pure-button' type='submit' />
          </div>          
        </fieldset>
      </form>
    )
  }
}

export default PostForm