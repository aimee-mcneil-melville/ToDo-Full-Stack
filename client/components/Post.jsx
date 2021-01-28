import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Comments from './Comments'
import { deletePost, getCommentsByPostId } from '../api'
function Post (props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    const id = props.post.id || props.match.params.id
    if (id) {
      fetchComments(id)
    }
  }, [])

  function fetchComments (postId) {
    getCommentsByPostId(postId)
      .then(comments => {
        setComments(comments)
        return null
      })
      .catch(err => setErrorMessage(err.message))
  }

  function removePost () {
    deletePost(props.post.id)
      .then(props.fetchPosts)
      .then(() => props.history.push('/'))
      .catch(err => setErrorMessage(err.message))
  }

  const { title, paragraphs, dateCreated, id } = props.post
  return (
    <div className='post'>
      <Link to={`/posts/${id}`}>
        <header className='post-header'>
          <h2 className='post-title'>{title}</h2>
          <p className='post-meta'>
            Date Created: {new Date(dateCreated).toDateString()}
          </p>
        </header>
      </Link>

      {paragraphs.map((para, key) => {
        return (
          <p key={key}>{para}</p>
        )
      })}

      <div className='pure-button-group' role='group'>
        <Link to={`/posts/edit/${id}`}>
          <button className='button-secondary pure-button'>Edit</button>
        </Link>
        <button
          className='button-error pure-button'
          onClick={removePost}>
          Delete
        </button>
      </div>

      <Link to={`/posts/${id}`}>
        <div className='comment-count'>
          <p>
            {comments.length} comments
          </p>
        </div>
      </Link>

      {props.path !== '/' &&
        <Comments
          postId={id}
          comments={comments}
          fetchComments={fetchComments}
        />
      }

      {errorMessage && errorMessage}
    </div>
  )
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
