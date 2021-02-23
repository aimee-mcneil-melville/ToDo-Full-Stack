import React, { useState, useEffect } from 'react'
import { addPost, updatePost } from '../api'

function PostForm (props) {
  const [post, setPost] = useState({ title: '', paragraphs: [] })
  const [errorMessage, setErrorMessage] = useState('')

  const currentPost = props.post
  useEffect(() => {
    if (currentPost) setNewPost(currentPost)
  }, [])

  useEffect(() => {
    if (post && !currentPost)setNewPost(post)
  }, [props.post])

  function setNewPost (post) {
    const paragraphs = post.paragraphs.join('\n')
    setPost({
      ...post, paragraphs
    })
  }

  function completePostData (post) {
    if (post.paragraphs && post.title) {
      return true
    } else {
      setErrorMessage('Your blog entry is incomplete')
      return false
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    const { history, fetchPosts } = props
    if (props.post) {
      if (completePostData(post)) {
        updatePost(post)
          .then(fetchPosts)
          .then(() => navigateToPost(post.id))
          .catch(err => setErrorMessage(err.message))
      }
    } else {
      let postId = null
      if (completePostData(post)) {
        addPost(post)
          .then((newPost) => {
            postId = newPost.id
            return fetchPosts()
          })
          .then(() => navigateToPost(postId))
          .catch(err => setErrorMessage(err.message))
      }
    }

    function navigateToPost (id) {
      return history.push(`/posts/${id}`)
    }
  }

  function handleChange (e) {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  return (
    <form className='pure-form pure-form-aligned' onSubmit={handleSubmit}>
      {props.post
        ? <h2 className='post-title'>Edit Post</h2>
        : <h2 className='post-title'>Add a New Blog Post</h2>
      }

      <fieldset>
        <div className='pure-control-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={post.title}
            onChange={handleChange}
          />
        </div>

        <div className='pure-control-group'>
          <label htmlFor='paragraphs'>Blog</label>
          <textarea
            name='paragraphs'
            value={post.paragraphs}
            onChange={handleChange}>
          </textarea>
        </div>

        <div className='pure-controls'>
          <input className='pure-button' type='submit' />
        </div>
      </fieldset>

      <p>{errorMessage && errorMessage}</p>
    </form>
  )
}

export default PostForm
