import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { PostData } from '../../models/post.ts'
import { addPost, updatePost } from '../api/index.ts'
import type useFetchPosts from './hooks/useFetchPosts.ts'
type FetchPosts = ReturnType<typeof useFetchPosts>

interface Props {
  variant?: 'edit' | 'new'
  loading?: boolean
}

function PostForm(props: Props) {
  const navigate = useNavigate()
  const { id } = useParams()
  const { posts, loading, fetchPosts } = useOutletContext<FetchPosts>()
  const post = posts.find((post) => post.id === Number(id))
  const [newPost, setNewPost] = useState<PostData>({ title: '', text: '' })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (props.variant === 'edit' && !loading && post) {
      setNewPost({ title: post.title, text: post.text })
    }
  }, [post, loading, props.variant])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!completePostData(newPost)) return null
    if (props.variant === 'edit' && id) {
      return updatePost(id, newPost).then(() => {
        fetchPosts()
        navigate(`/posts/${id}`)
      })
    } else if (props.variant === 'new') {
      return addPost(newPost).then((newPost) => {
        fetchPosts()
        navigate(`/posts/${newPost.id}`)
      })
    }
  }

  function completePostData(post: PostData) {
    if (post.text && post.title) {
      return true
    } else {
      setErrorMessage('Your blog entry is incomplete')
      return false
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  if (props.loading) return <p>Loading...</p>

  return (
    <form className="pure-form pure-form-aligned" onSubmit={onSubmit}>
      {props.variant === 'edit' ? (
        <h2 className="post-title">Edit Post</h2>
      ) : (
        <h2 className="post-title">Add a New Blog Post</h2>
      )}

      <fieldset>
        <div className="pure-control-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="text">Blog</label>
          <textarea
            name="text"
            value={newPost.text}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pure-controls">
          <input className="pure-button" type="submit" />
        </div>
      </fieldset>

      <p>{errorMessage && errorMessage}</p>
    </form>
  )
}

export default PostForm
