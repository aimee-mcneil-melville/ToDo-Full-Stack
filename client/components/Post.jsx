import React from 'react'
import {
  useParams,
  Link,
  Outlet,
  useOutletContext,
  useNavigate,
} from 'react-router-dom'
import useFetchComments from './hooks/useFetchComments'

import { deletePost } from '../api'

import PostSummary from './PostSummary'
import Comment from './Comment'

function Post() {
  const { id } = useParams()
  const { posts, loading, error, fetchPosts } = useOutletContext()
  const navigate = useNavigate()
  const post = posts.find((post) => post.id === Number(id)) || {}
  const {
    comments,
    error: commentsError,
    fetchComments,
  } = useFetchComments(Number(id))

  function removePost() {
    deletePost(Number(id))
      .then(() => {
        fetchPosts()
        navigate('/')
        return null
      })
      .catch((err) => console.log(err))
  }

  if (loading) return <>Loading...</>

  return (
    <>
      <PostSummary post={post}>
        <div className="pure-button-group" role="group">
          <Link to={`/posts/${id}/edit`}>
            <button className="button-secondary pure-button">Edit</button>
          </Link>
          <button className="button-error pure-button" onClick={removePost}>
            Delete
          </button>
        </div>

        <div className="comment-count">
          <p>
            {comments.length} {comments.length !== 1 ? 'comments' : 'comment'}
          </p>
        </div>

        <Link className="pure-button" to={`/posts/${id}/comments/new`}>
          Add A New Comment
        </Link>

        <Outlet context={{ comments, commentsError: error, fetchComments }} />

        {comments &&
          comments.map((comment) => (
            <Comment
              comment={comment}
              fetchComments={fetchComments}
              key={comment.id}
            />
          ))}

        {error && error}
        {commentsError && commentsError}
      </PostSummary>
    </>
  )
}

export default Post
